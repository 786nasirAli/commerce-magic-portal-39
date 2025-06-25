import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/contexts/CartContext';
import { SliderProvider } from '@/contexts/SliderContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Index from '@/pages/Index';
import Shop from '@/pages/Shop';
import Jewelry from '@/pages/Jewelry';
import Bags from '@/pages/Bags';
import Clothes from '@/pages/Clothes';
import Shoes from '@/pages/Shoes';
import Women from '@/pages/Women';
import Men from '@/pages/Men';
import GirlsBoys from '@/pages/GirlsBoys';
import Kids from '@/pages/Kids';
import NewArrival from '@/pages/NewArrival';
import OnSale from '@/pages/OnSale';
import Brand from '@/pages/Brand';
import Admin from '@/pages/Admin';
import CategoryPage from '@/pages/CategoryPage';
import NotFound from '@/pages/NotFound';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SliderProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/jewelry" element={<Jewelry />} />
                <Route path="/bags" element={<Bags />} />
                <Route path="/clothes" element={<Clothes />} />
                <Route path="/shoes" element={<Shoes />} />
                <Route path="/women" element={<Women />} />
                <Route path="/men" element={<Men />} />
                <Route path="/girls-boys" element={<GirlsBoys />} />
                <Route path="/kids" element={<Kids />} />
                <Route path="/new-arrival" element={<NewArrival />} />
                <Route path="/on-sale" element={<OnSale />} />
                <Route path="/brand/:brandName" element={<Brand />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </SliderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
