import { useState } from "react";
import { useGetMenuItems } from "@workspace/api-client-react";
import type { MenuItem } from "@workspace/api-client-react/src/generated/api.schemas";
import { useCart } from "@/lib/cart-context";
import { motion } from "framer-motion";
import { Plus, Leaf, WheatOff } from "lucide-react";

export default function MenuPage() {
  const { data: menuItems, isLoading, error } = useGetMenuItems();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", "starters", "mains", "desserts", "drinks", "specials"];

  const filteredItems = menuItems?.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  return (
    <div className="w-full min-h-screen pb-24">
      {/* Hero Header */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={`${import.meta.env.BASE_URL}images/menu-hero.png`}
            alt="Menu background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-background/20" />
        </div>
        <div className="relative z-10 text-center mt-16">
          <h1 className="font-serif text-5xl md:text-6xl text-foreground text-shadow">Our Menu</h1>
          <div className="w-24 h-[1px] bg-primary mx-auto mt-6" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-xs uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-muted-foreground hover:text-foreground border border-border hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse flex flex-col gap-4 bg-card/50 p-4 rounded-sm">
                <div className="w-full h-48 bg-muted rounded-sm" />
                <div className="h-6 bg-muted w-3/4" />
                <div className="h-4 bg-muted w-full" />
                <div className="h-4 bg-muted w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-destructive py-12">
            Failed to load menu. Please try again later.
          </div>
        ) : filteredItems?.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            No items found in this category.
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems?.map((item) => (
              <MenuItemCard key={item.id} item={item} onAdd={() => addToCart({
                menuItemId: item.id,
                name: item.name,
                price: item.price,
                imageUrl: item.imageUrl
              })} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function MenuItemCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  // Use a beautifully dark food image as fallback if none provided
  // fine dining dark elegant
  const fallbackImage = "https://images.unsplash.com/photo-1504670073073-6123e39e0754?w=600&q=80";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="group bg-card border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden flex flex-col hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.imageUrl || fallbackImage}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {item.isVegetarian && (
            <div className="bg-background/80 backdrop-blur-sm p-1.5 rounded-full border border-border" title="Vegetarian">
              <Leaf className="w-4 h-4 text-green-400" />
            </div>
          )}
          {item.isGlutenFree && (
            <div className="bg-background/80 backdrop-blur-sm p-1.5 rounded-full border border-border" title="Gluten Free">
              <WheatOff className="w-4 h-4 text-amber-200" />
            </div>
          )}
        </div>
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px] flex items-center justify-center">
            <span className="text-foreground uppercase tracking-widest text-sm border border-foreground px-4 py-2">Sold Out</span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3 gap-4">
          <h3 className="font-serif text-xl text-foreground">{item.name}</h3>
          <span className="text-primary font-medium">₹{item.price.toFixed(2)}</span>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <div className="flex gap-1">
            {item.spicyLevel > 0 && Array.from({length: item.spicyLevel}).map((_, i) => (
              <span key={i} className="text-red-500 text-lg" title={`Spicy Level ${item.spicyLevel}`}>🌶</span>
            ))}
          </div>
          <button
            onClick={onAdd}
            disabled={!item.isAvailable}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground hover:text-primary transition-colors disabled:opacity-50 disabled:hover:text-foreground"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
