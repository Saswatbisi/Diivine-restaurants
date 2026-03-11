import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-20">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${import.meta.env.BASE_URL}images/about-hero.png)`,
          }}
        >
          <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif text-foreground mb-6"
          >
            Our Story
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-[1px] bg-primary mx-auto"
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="prose prose-invert prose-lg mx-auto"
        >
          <h2 className="text-3xl font-serif text-primary mb-8 text-center">A Symphony of Heritage and Innovation</h2>
          
          <p className="text-muted-foreground leading-relaxed mb-6 font-light text-lg">
            Diivine was born from a singular vision: to elevate traditional Indian cuisine into an unforgettable fine-dining art form. Nestled in the heart of the city, our restaurant is a sanctuary where age-old recipes meet contemporary culinary techniques, creating a symphony of flavors that honor the rich gastronomic heritage of the Indian subcontinent.
          </p>
          
          <p className="text-muted-foreground leading-relaxed mb-6 font-light text-lg">
            Our journey began intimately, rooted in the royal kitchens of era's passed. Each dish tells a story of fragrant whole spices slow-roasted to perfection, of secret marinades passed down through generations, and of the tireless pursuit of culinary excellence. We source only the finest seasonal ingredients, transforming them through meticulous preparation into dishes that are both authentic and innovative.
          </p>

          <div className="my-12 p-8 border border-primary/20 bg-card/30 text-center rounded-sm">
            <p className="text-2xl font-serif text-card-foreground italic">
              "To dine at Diivine is to experience the very soul of India—complex, vibrant, and extraordinarily beautiful."
            </p>
          </div>

          <h3 className="text-2xl font-serif text-primary mb-6">Our Culinary Philosophy</h3>
          
          <p className="text-muted-foreground leading-relaxed mb-6 font-light text-lg">
            We believe that fine dining is not merely about sustenance, but about orchestration. It is the careful balance of sweet, sour, salty, bitter, and the elusive umami—often achieved in Indian cooking through our masterful tempering of spices (tadka). Every plate is designed to be a visual masterpiece and a revelation on the palate.
          </p>
          
          <p className="text-muted-foreground leading-relaxed font-light text-lg">
            Whether you are indulging in our slow-cooked Hyderabadi Dum Biryani or savoring the delicate layers of our Jalebi with Rabri, you are partaking in a labor of love. We invite you to step into our timeless dining room, allow our impeccable service to anticipate your every need, and join us on an extraordinary culinary journey.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
