import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateReservation } from "@workspace/api-client-react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";

const reservationSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(7, "Valid phone number is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  partySize: z.coerce.number().min(1).max(20),
  occasion: z.enum(["birthday", "anniversary", "business", "other", "none"]).optional(),
  specialRequests: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

export default function ReservationPage() {
  const createResMutation = useCreateReservation();
  
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      partySize: 2,
      occasion: "none",
    }
  });

  const onSubmit = (data: ReservationFormValues) => {
    createResMutation.mutate(
      { data },
      {
        onSuccess: (res) => {
          form.reset();
          toast({
            title: "Reservation Confirmed",
            description: `We look forward to hosting you on ${res.date} at ${res.time}. Reservation #${res.id}`,
            className: "bg-primary text-primary-foreground",
          });
        },
        onError: () => {
          toast({
            title: "Booking Failed",
            description: "We couldn't secure your reservation at this time. Please call us.",
            variant: "destructive",
          });
        }
      }
    );
  };

  return (
    <div className="w-full min-h-screen">
      {/* Split layout: Image Left, Form Right */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Side: Image */}
        <div className="lg:w-1/2 relative hidden lg:block">
          <div className="absolute inset-0 z-0">
            <img 
              src={`${import.meta.env.BASE_URL}images/reservation-hero.png`} 
              alt="Restaurant Table" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-background" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end p-16">
            <h2 className="font-serif text-5xl text-foreground text-shadow-lg leading-tight mb-4">
              Reserve Your <br/>
              <span className="text-primary italic">Experience</span>
            </h2>
            <p className="text-muted-foreground/80 max-w-md text-shadow">
              Join us for an unforgettable evening. For parties larger than 20, 
              please contact the restaurant directly for private dining options.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 pt-32 lg:pt-6 bg-background">
          <div className="max-w-md w-full">
            <div className="lg:hidden mb-12 text-center">
              <h1 className="font-serif text-4xl text-foreground mb-4">Book a Table</h1>
              <p className="text-muted-foreground text-sm">Join us for an unforgettable evening.</p>
            </div>

            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={form.handleSubmit(onSubmit)} 
              className="space-y-6"
            >
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Full Name</label>
                  <input
                    {...form.register("customerName")}
                    className="w-full bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none px-4 py-3 text-foreground transition-all"
                  />
                  {form.formState.errors.customerName && <p className="text-destructive text-xs">{form.formState.errors.customerName.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                  <input
                    {...form.register("customerEmail")}
                    type="email"
                    className="w-full bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none px-4 py-3 text-foreground transition-all"
                  />
                  {form.formState.errors.customerEmail && <p className="text-destructive text-xs">{form.formState.errors.customerEmail.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Phone Number</label>
                <input
                  {...form.register("customerPhone")}
                  className="w-full bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none px-4 py-3 text-foreground transition-all"
                />
                {form.formState.errors.customerPhone && <p className="text-destructive text-xs">{form.formState.errors.customerPhone.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2"><Calendar className="w-3 h-3"/> Date</label>
                  <input
                    type="date"
                    {...form.register("date")}
                    className="w-full bg-card border border-border focus:border-primary outline-none px-4 py-3 text-foreground text-sm"
                  />
                  {form.formState.errors.date && <p className="text-destructive text-xs">{form.formState.errors.date.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2"><Clock className="w-3 h-3"/> Time</label>
                  <input
                    type="time"
                    {...form.register("time")}
                    className="w-full bg-card border border-border focus:border-primary outline-none px-4 py-3 text-foreground text-sm"
                  />
                  {form.formState.errors.time && <p className="text-destructive text-xs">{form.formState.errors.time.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2"><Users className="w-3 h-3"/> Guests</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    {...form.register("partySize")}
                    className="w-full bg-card border border-border focus:border-primary outline-none px-4 py-3 text-foreground text-sm"
                  />
                  {form.formState.errors.partySize && <p className="text-destructive text-xs">{form.formState.errors.partySize.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Occasion</label>
                <div className="relative">
                  <select
                    {...form.register("occasion")}
                    className="w-full bg-card border border-border focus:border-primary outline-none px-4 py-3 text-foreground appearance-none"
                  >
                    <option value="none">Just Dining</option>
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="business">Business Meeting</option>
                    <option value="other">Other Celebration</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Special Requests</label>
                <textarea
                  {...form.register("specialRequests")}
                  className="w-full bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none px-4 py-3 text-foreground transition-all min-h-[100px] resize-none"
                  placeholder="Dietary restrictions, preferred seating..."
                />
              </div>

              <button
                type="submit"
                disabled={createResMutation.isPending}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 text-sm uppercase tracking-widest font-medium hover:bg-primary/90 transition-all disabled:opacity-50 mt-4"
              >
                {createResMutation.isPending ? "Confirming..." : "Confirm Reservation"} 
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}
