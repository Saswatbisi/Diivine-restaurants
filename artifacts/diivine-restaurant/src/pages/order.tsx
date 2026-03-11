import { useCart } from "@/lib/cart-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateOrder } from "@workspace/api-client-react";
import { Link, useLocation } from "wouter";
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const orderSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().optional(),
  deliveryType: z.enum(["delivery", "pickup", "dine_in"]),
  deliveryAddress: z.string().optional(),
  tableNumber: z.coerce.number().optional(),
  specialInstructions: z.string().optional(),
});

type OrderFormValues = z.infer<typeof orderSchema>;

export default function OrderPage() {
  const { items, totalItems, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const createOrderMutation = useCreateOrder();

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      deliveryType: "dine_in",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      specialInstructions: "",
    },
  });

  const deliveryType = form.watch("deliveryType");

  const onSubmit = (data: OrderFormValues) => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before ordering.",
        variant: "destructive",
      });
      return;
    }

    if (data.deliveryType === "delivery" && !data.deliveryAddress) {
      form.setError("deliveryAddress", { message: "Address is required for delivery" });
      return;
    }

    createOrderMutation.mutate(
      {
        data: {
          ...data,
          items: items.map((i) => ({ menuItemId: i.menuItemId, quantity: i.quantity })),
        },
      },
      {
        onSuccess: (res) => {
          clearCart();
          toast({
            title: "Order Placed Successfully",
            description: `Order #${res.id} has been confirmed.`,
            className: "bg-primary text-primary-foreground",
          });
          setLocation("/tracking");
        },
        onError: () => {
          toast({
            title: "Order Failed",
            description: "There was a problem placing your order. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-24 px-6">
        <h2 className="font-serif text-4xl mb-6">Your Selection is Empty</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          You haven't selected any exquisite dishes yet. Explore our menu to begin your culinary journey.
        </p>
        <Link 
          href="/menu"
          className="px-8 py-3 bg-primary text-primary-foreground uppercase tracking-widest text-xs font-medium hover:bg-primary/90 transition-colors"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="mb-12">
        <Link href="/menu" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Menu
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mt-6">Complete Order</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Left Col: Order Form */}
        <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
          <div className="bg-card border border-border p-6 md:p-8">
            <h2 className="text-xl font-serif mb-6 border-b border-border/50 pb-4">Guest Details</h2>
            
            <form id="order-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Full Name *</label>
                  <input
                    {...form.register("customerName")}
                    className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none px-4 py-3 text-foreground transition-all"
                    placeholder="Jane Doe"
                  />
                  {form.formState.errors.customerName && (
                    <p className="text-destructive text-xs mt-1">{form.formState.errors.customerName.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Email *</label>
                  <input
                    {...form.register("customerEmail")}
                    type="email"
                    className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none px-4 py-3 text-foreground transition-all"
                    placeholder="jane@example.com"
                  />
                  {form.formState.errors.customerEmail && (
                    <p className="text-destructive text-xs mt-1">{form.formState.errors.customerEmail.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Phone (Optional)</label>
                <input
                  {...form.register("customerPhone")}
                  className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none px-4 py-3 text-foreground transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="pt-6 border-t border-border/50">
                <h2 className="text-xl font-serif mb-6">Dining Preference</h2>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {["dine_in", "pickup", "delivery"].map((type) => (
                    <label
                      key={type}
                      className={`cursor-pointer border text-center py-4 px-2 transition-all ${
                        deliveryType === type 
                          ? "border-primary bg-primary/10 text-primary" 
                          : "border-border hover:border-primary/50 text-muted-foreground"
                      }`}
                    >
                      <input
                        type="radio"
                        value={type}
                        {...form.register("deliveryType")}
                        className="hidden"
                      />
                      <span className="text-xs uppercase tracking-widest block">
                        {type.replace("_", " ")}
                      </span>
                    </label>
                  ))}
                </div>

                {deliveryType === "delivery" && (
                  <div className="space-y-2 mb-6 animate-in slide-in-from-top-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Delivery Address *</label>
                    <input
                      {...form.register("deliveryAddress")}
                      className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none px-4 py-3 text-foreground transition-all"
                      placeholder="123 Luxury Ave, Suite 400"
                    />
                    {form.formState.errors.deliveryAddress && (
                      <p className="text-destructive text-xs mt-1">{form.formState.errors.deliveryAddress.message}</p>
                    )}
                  </div>
                )}

                {deliveryType === "dine_in" && (
                  <div className="space-y-2 mb-6 animate-in slide-in-from-top-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Table Number (If seated)</label>
                    <input
                      type="number"
                      {...form.register("tableNumber")}
                      className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none px-4 py-3 text-foreground transition-all"
                      placeholder="e.g. 12"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Special Instructions</label>
                  <textarea
                    {...form.register("specialInstructions")}
                    className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none px-4 py-3 text-foreground transition-all min-h-[100px] resize-none"
                    placeholder="Allergies, preferences, etc."
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Col: Order Summary */}
        <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2">
          <div className="bg-card border border-border p-6 sticky top-32">
            <h2 className="text-xl font-serif mb-6 border-b border-border/50 pb-4">Your Selection</h2>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-6">
              {items.map((item) => (
                <div key={item.menuItemId} className="flex gap-4 items-center">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground">{item.name}</h4>
                    <p className="text-primary text-sm">₹{item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 border border-border rounded-sm px-2 py-1 bg-background">
                    <button 
                      onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.menuItemId)}
                    className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border/50 pt-4 space-y-3 mb-8">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Taxes & Fees (Calculated at next step)</span>
                <span>--</span>
              </div>
              <div className="flex justify-between text-lg font-serif text-foreground pt-3 border-t border-border/50">
                <span>Total</span>
                <span className="text-primary">₹{subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              form="order-form"
              disabled={createOrderMutation.isPending}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 text-sm uppercase tracking-widest font-medium hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {createOrderMutation.isPending ? "Processing..." : "Confirm Order"} 
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
