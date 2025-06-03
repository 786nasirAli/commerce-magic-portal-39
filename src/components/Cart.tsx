
import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard, Truck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const Cart: React.FC = () => {
  const { state, removeFromCart, updateQuantity, toggleCart, getTotalPrice, dispatch } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  const shippingCost = getTotalPrice() > 50 ? 0 : 9.99;
  const tax = getTotalPrice() * 0.08; // 8% tax
  const finalTotal = getTotalPrice() + shippingCost + tax;

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'welcome10') {
      toast({
        title: "🎉 Coupon applied!",
        description: "You saved 10% with code WELCOME10",
      });
      setCouponCode('');
    } else {
      toast({
        title: "❌ Invalid coupon",
        description: "Please check your coupon code and try again.",
        variant: "destructive",
      });
    }
  };

  const handleCheckout = () => {
    if (state.items.length === 0) return;
    
    // Simulate checkout process
    toast({
      title: "🎉 Order placed successfully!",
      description: `Your order of $${finalTotal.toFixed(2)} has been confirmed.`,
    });
    
    // Clear cart
    dispatch({ type: 'CLEAR_CART' });
    setShowCheckout(false);
    toggleCart();
  };

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleCart} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-blue-50">
            <h2 className="text-lg font-semibold text-gray-900">
              🛒 Shopping Cart ({state.items.reduce((total, item) => total + item.quantity, 0)})
            </h2>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-4">Add some products to get started!</p>
                <Button onClick={toggleCart} className="bg-blue-600 hover:bg-blue-700">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.brand}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-green-600">${item.price}</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-500">
                          Total: ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary & Checkout */}
          {state.items.length > 0 && (
            <div className="border-t bg-gray-50">
              {/* Coupon Code */}
              <div className="p-4 border-b">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={applyCoupon}
                    variant="outline"
                    size="sm"
                  >
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Try code: WELCOME10</p>
              </div>

              {/* Order Summary */}
              <div className="p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-xl text-green-600">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {getTotalPrice() < 50 && (
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <p className="text-xs text-blue-700">
                      🚚 Add ${(50 - getTotalPrice()).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}
              </div>

              {/* Checkout Buttons */}
              <div className="p-4 space-y-2">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                  size="lg"
                  onClick={handleCheckout}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Checkout Now
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={toggleCart}
                >
                  Continue Shopping
                </Button>
              </div>

              {/* Security & Trust Badges */}
              <div className="p-4 bg-gray-100 text-center">
                <div className="flex justify-center items-center space-x-4 text-xs text-gray-600">
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 mr-1" />
                    Fast Delivery
                  </div>
                  <div>🔒 Secure Payment</div>
                  <div>💯 Money Back</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
