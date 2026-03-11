import { useState } from "react";
import { useGetOrder } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Search, ChefHat, CheckCircle2, Clock, MapPin, Loader2 } from "lucide-react";

export default function TrackingPage() {
  const [orderId, setOrderId] = useState<string>("");
  const [queryId, setQueryId] = useState<number | null>(null);

  const { data: order, isLoading, error } = useGetOrder(queryId ?? 0, {
    query: {
      enabled: queryId !== null && queryId > 0,
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(orderId);
    if (!isNaN(id)) {
      setQueryId(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-amber-400 border-amber-400';
      case 'confirmed': return 'text-blue-400 border-blue-400';
      case 'preparing': return 'text-purple-400 border-purple-400';
      case 'ready': return 'text-primary border-primary';
      case 'delivered': return 'text-green-400 border-green-400';
      case 'cancelled': return 'text-destructive border-destructive';
      default: return 'text-muted-foreground border-border';
    }
  };

  return (
    <div className="w-full min-h-screen pt-32 pb-24 px-6 flex flex-col items-center">
      <div className="text-center mb-12 max-w-lg mx-auto">
        <h1 className="font-serif text-4xl text-foreground mb-4">Track Order</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Enter your order number below to check the current status of your culinary experience.
        </p>
      </div>

      <form onSubmit={handleSearch} className="w-full max-w-md flex mb-16">
        <input 
          type="text" 
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="e.g. 1024"
          className="flex-1 bg-card border border-r-0 border-border focus:border-primary outline-none px-6 py-4 text-foreground"
        />
        <button 
          type="submit"
          className="bg-primary text-primary-foreground px-6 flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>

      {/* Results Area */}
      <div className="w-full max-w-2xl">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 text-primary">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p className="uppercase tracking-widest text-xs">Locating Order...</p>
          </div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-destructive/10 border border-destructive/30 p-6 text-center rounded-sm text-destructive"
          >
            Order not found. Please check the number and try again.
          </motion.div>
        )}

        {order && !isLoading && !error && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border p-8 relative overflow-hidden shadow-xl"
          >
            {/* Decorative background logo icon */}
            <ChefHat className="absolute -right-10 -bottom-10 w-48 h-48 text-border opacity-20 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border/50">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Order Number</p>
                  <h2 className="text-2xl font-serif text-foreground">#{order.id}</h2>
                </div>
                <div className={`px-4 py-2 border ${getStatusColor(order.status)} bg-background uppercase tracking-widest text-[10px] font-bold rounded-sm`}>
                  {order.status}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Delivery Detail
                  </p>
                  <p className="text-sm text-foreground capitalize">{order.deliveryType.replace('_', ' ')}</p>
                  {order.deliveryAddress && <p className="text-sm text-muted-foreground mt-1">{order.deliveryAddress}</p>}
                  {order.tableNumber && <p className="text-sm text-muted-foreground mt-1">Table {order.tableNumber}</p>}
                </div>
                
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Ordered At
                  </p>
                  <p className="text-sm text-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium uppercase tracking-widest border-b border-border/50 pb-3 mb-4">Order Items</h3>
                <ul className="space-y-3 mb-6">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.quantity}x <span className="text-foreground ml-2">{item.menuItemName}</span></span>
                      <span className="text-primary">₹{(item.unitPrice * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center pt-4 border-t border-border/50">
                  <span className="text-sm font-medium uppercase tracking-widest">Total</span>
                  <span className="text-xl font-serif text-primary">₹{order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
