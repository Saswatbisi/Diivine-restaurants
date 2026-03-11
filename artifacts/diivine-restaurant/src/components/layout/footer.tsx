import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <h3 className="font-serif text-2xl tracking-widest text-foreground mb-6">
            DIIVINE
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
            A symphony of flavors orchestrating an unforgettable culinary journey. 
            Experience fine dining elevated to an art form.
          </p>
        </div>
        
        <div>
          <h4 className="text-primary text-xs uppercase tracking-[0.2em] font-medium mb-6">
            Reservations
          </h4>
          <p className="text-muted-foreground text-sm mb-2">Bijnor, Uttar Pradesh 246701</p>
          <p className="text-muted-foreground text-sm mb-2">(+91) 07906221960</p>
          <p className="text-muted-foreground text-sm">reservations@diivine.com</p>
        </div>

        <div>
          <h4 className="text-primary text-xs uppercase tracking-[0.2em] font-medium mb-6">
            Hours
          </h4>
          <p className="text-muted-foreground text-sm mb-2">Mon - Thu: 5:00 PM - 10:00 PM</p>
          <p className="text-muted-foreground text-sm mb-2">Fri - Sat: 5:00 PM - 11:30 PM</p>
          <p className="text-muted-foreground text-sm">Sunday: Closed</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Diivine Restaurant. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
