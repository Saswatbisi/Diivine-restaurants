import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "Our Story" },
    { href: "/reservation", label: "Reservations" },
    { href: "/tracking", label: "Track Order" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-border/50 py-4 shadow-lg"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group">
            <span className="font-serif text-3xl tracking-widest text-foreground group-hover:text-primary transition-colors duration-300">
              DIIVINE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-widest uppercase transition-colors duration-300 ${
                  location === link.href
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <Link
              href="/order"
              className="relative text-foreground hover:text-primary transition-colors duration-300"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-6">
            <Link href="/order" className="relative text-foreground">
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-foreground focus:outline-none"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col"
          >
            <div className="p-6 flex justify-end">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-serif tracking-widest uppercase ${
                    location === link.href ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
