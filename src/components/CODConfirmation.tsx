
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Mail, Package, CreditCard, Check } from 'lucide-react';

interface CODConfirmationProps {
  onConfirm: (orderData: any) => void;
  cartItems: any[];
  totalAmount: number;
}

const CODConfirmation: React.FC<CODConfirmationProps> = ({ onConfirm, cartItems, totalAmount }) => {
  const [orderForm, setOrderForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!orderForm.fullName || !orderForm.email || !orderForm.phone || !orderForm.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate order processing
    try {
      const orderData = {
        ...orderForm,
        items: cartItems,
        total: totalAmount,
        paymentMethod: 'Cash on Delivery',
        orderDate: new Date().toISOString(),
        orderNumber: `BA-${Date.now()}`
      };

      // In a real app, this would send an email via Supabase
      console.log('COD Order submitted:', orderData);
      
      toast({
        title: "Order Confirmed! 📦",
        description: "Your Cash on Delivery order has been placed. You'll receive a confirmation email shortly.",
      });

      onConfirm(orderData);
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5 text-pink-600" />
          Cash on Delivery Order
        </CardTitle>
        <CardDescription>
          Complete your order details. You'll pay when your order is delivered.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={orderForm.fullName}
                onChange={(e) => setOrderForm(prev => ({ ...prev, fullName: e.target.value }))}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={orderForm.email}
                onChange={(e) => setOrderForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={orderForm.phone}
                onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={orderForm.city}
                onChange={(e) => setOrderForm(prev => ({ ...prev, city: e.target.value }))}
                placeholder="Enter your city"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Delivery Address *</Label>
            <Input
              id="address"
              value={orderForm.address}
              onChange={(e) => setOrderForm(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Enter your full delivery address"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={orderForm.postalCode}
                onChange={(e) => setOrderForm(prev => ({ ...prev, postalCode: e.target.value }))}
                placeholder="12345"
              />
            </div>
            <div>
              <Label htmlFor="notes">Special Notes</Label>
              <Input
                id="notes"
                value={orderForm.notes}
                onChange={(e) => setOrderForm(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any special delivery instructions"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4 mt-6">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <div className="space-y-2">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 font-semibold flex justify-between">
                <span>Total (COD)</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Info */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-yellow-600" />
              <span className="font-medium text-yellow-800">Cash on Delivery</span>
            </div>
            <p className="text-sm text-yellow-700">
              You will pay in cash when your order is delivered to your address.
            </p>
          </div>

          {/* Email Notification Info */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-800">Email Confirmation</span>
            </div>
            <p className="text-sm text-blue-700">
              A confirmation email will be sent to {orderForm.email || 'your email address'} with order details and tracking information.
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-pink-600 hover:bg-pink-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Processing Order..."
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Confirm Cash on Delivery Order
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CODConfirmation;
