
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SliderProvider } from "./contexts/SliderContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import OnSale from "./pages/OnSale";
import Brand from "./pages/Brand";
import NewArrival from "./pages/NewArrival";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Jewelry from "./pages/Jewelry";
import Bags from "./pages/Bags";
import Clothes from "./pages/Clothes";
import Shoes from "./pages/Shoes";
import Women from "./pages/Women";
import Men from "./pages/Men";
import GirlsBoys from "./pages/GirlsBoys";
import Kids from "./pages/Kids";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <SliderProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/on-sale" element={<OnSale />} />
                <Route path="/brand" element={<Brand />} />
                <Route path="/new-arrival" element={<NewArrival />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/jewelry" element={<Jewelry />} />
                <Route path="/bags" element={<Bags />} />
                <Route path="/clothes" element={<Clothes />} />
                <Route path="/shoes" element={<Shoes />} />
                <Route path="/women" element={<Women />} />
                <Route path="/men" element={<Men />} />
                <Route path="/girls-boys" element={<GirlsBoys />} />
                <Route path="/kids" element={<Kids />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </SliderProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
