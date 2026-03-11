import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star, Clock, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Diivine Restaurant Interior"
            className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-primary text-sm md:text-base uppercase tracking-[0.3em] mb-6">
              Welcome to the extraordinary
            </h2>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground text-shadow-lg leading-tight mb-8">
              A Taste of <br />
              <span className="italic font-light">Elegance</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-light max-w-2xl mx-auto mb-12">
              Discover a curated menu that blends timeless tradition with modern culinary artistry in a breathtaking atmosphere.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/reservation" 
                className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground text-sm uppercase tracking-widest font-medium hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_30px_rgba(201,168,76,0.5)]"
              >
                Book a Table
              </Link>
              <Link 
                href="/menu" 
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-primary text-primary text-sm uppercase tracking-widest font-medium hover:bg-primary/10 transition-all duration-300"
              >
                Explore Menu
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-primary text-xs uppercase tracking-[0.2em] font-medium mb-4">Our Story</h3>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8">Culinary Perfection, Crafted Daily.</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At Diivine, we believe that dining is more than just eating—it's an experience. 
              Our executive chefs source only the finest seasonal ingredients to create dishes 
              that challenge the palate and delight the senses.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Every detail, from the ambient lighting to the meticulously plated courses, 
              has been designed to transport you to a world of unparalleled luxury.
            </p>
            <Link href="/about" className="inline-flex items-center text-primary uppercase tracking-widest text-sm hover:gap-3 transition-all gap-2">
              Read Our Story <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Using tasteful food images from Unsplash for atmosphere */}
            {/* fine dining elegant plated food */}
            <img 
              src="https://pixabay.com/get/gc4b1706041bb4f30a46cbf34a21e7d48224c6336acccf8091d0ef3ab160bd771318a52288c37713149081a43897778b98b14dff2f96f4153e2f3383d6be5eb75_1280.jpg" 
              alt="Fine dining dish" 
              className="w-full h-64 object-cover rounded-sm"
            />
            {/* fine dining elegant plated food */}
            <img 
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80" 
              alt="Plated dish" 
              className="w-full h-64 object-cover rounded-sm mt-8"
            />
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-card py-24 border-y border-border">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mb-6 text-primary">
              <Star className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-2xl mb-3">Michelin Quality</h4>
            <p className="text-muted-foreground text-sm">Award-winning chefs bringing world-class expertise to your table.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mb-6 text-primary">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-2xl mb-3">Perfect Timing</h4>
            <p className="text-muted-foreground text-sm">Impeccable service paced to let you savor every moment of your evening.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mb-6 text-primary">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-2xl mb-3">Prime Location</h4>
            <p className="text-muted-foreground text-sm">Located in the heart of the city with exclusive valet parking.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
