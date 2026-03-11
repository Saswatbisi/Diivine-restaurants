import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { CartProvider } from "@/lib/cart-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import Home from "@/pages/home";
import MenuPage from "@/pages/menu";
import OrderPage from "@/pages/order";
import ReservationPage from "@/pages/reservation";
import TrackingPage from "@/pages/tracking";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
              <Navbar />
              <main className="flex-grow">
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/menu" component={MenuPage} />
                  <Route path="/order" component={OrderPage} />
                  <Route path="/reservation" component={ReservationPage} />
                  <Route path="/tracking" component={TrackingPage} />
                  <Route path="/about" component={About} />
                  <Route component={NotFound} />
                </Switch>
              </main>
              <Footer />
            </div>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
