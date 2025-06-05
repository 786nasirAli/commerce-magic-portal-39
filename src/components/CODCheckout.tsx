
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { MapPin, Phone, Mail, Package, CreditCard, Truck } from 'lucide-react';

interface CODFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  streetAddress: string;
  apartmentNumber: string;
  colony: string;
  city: string;
  postalCode: string;
  completeAddress: string;
}

interface CODCheckoutProps {
  onClose: () => void;
  onOrderComplete: () => void;
}

const CODCheckout: React.FC<CODCheckoutProps> = ({ onClose, onOrderComplete }) => {
  const { state, getTotalPrice } = useCart();
  const [formData, setFormData] = useState<CODFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    streetAddress: '',
    apartmentNumber: '',
    colony: '',
    city: '',
    postalCode: '',
    completeAddress: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pakistaniCities = [
    'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
    'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala',
    'Hyderabad', 'Sargodha', 'Bahawalpur', 'Sukkur', 'Larkana'
  ];

  const handleInputChange = (field: keyof CODFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const required = ['fullName', 'phoneNumber', 'streetAddress', 'colony', 'city'];
    const missingFields = required.filter(field => !formData[field as keyof CODFormData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return false;
    }

    // Phone number validation
    const phoneRegex = /^(\+92|0)?[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneNumber.replace(/\s/g, ''))) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Pakistani phone number",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create order object
      const order = {
        id: `COD-${Date.now()}`,
        customer: formData,
        items: state.items,
        total: getTotalPrice(),
        orderDate: new Date().toISOString(),
        status: 'confirmed',
        paymentMethod: 'Cash on Delivery'
      };

      // Save to localStorage (in real app, would save to database)
      const existingOrders = JSON.parse(localStorage.getItem('codOrders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('codOrders', JSON.stringify(existingOrders));

      toast({
        title: "🎉 Order Confirmed!",
        description: `Your order #${order.id} has been placed successfully. You will receive a call for confirmation.`,
      });

      onOrderComplete();
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const shippingCost = getTotalPrice() > 50 ? 0 : 9.99;
  const finalTotal = getTotalPrice() + shippingCost;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-pink-50 to-rose-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Cash on Delivery</h2>
              <p className="text-gray-600">Complete your order details</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Mail className="w-5 h-5 text-pink-500" />
              <h3 className="text-lg font-semibold">Personal Information</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="+92 300 1234567"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address (Optional)</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="w-5 h-5 text-pink-500" />
              <h3 className="text-lg font-semibold">Delivery Address</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="streetAddress">Street Address *</Label>
                <Input
                  id="streetAddress"
                  value={formData.streetAddress}
                  onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                  placeholder="House/Building number and street"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="apartmentNumber">Apartment/House Number</Label>
                <Input
                  id="apartmentNumber"
                  value={formData.apartmentNumber}
                  onChange={(e) => handleInputChange('apartmentNumber', e.target.value)}
                  placeholder="Apt, Suite, Floor (optional)"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="colony">Colony/Locality *</Label>
                <Input
                  id="colony"
                  value={formData.colony}
                  onChange={(e) => handleInputChange('colony', e.target.value)}
                  placeholder="Colony, Area, or Locality"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="city">City *</Label>
                <Select onValueChange={(value) => handleInputChange('city', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {pakistaniCities.map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  placeholder="12345"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="completeAddress">Complete Address (Additional Details)</Label>
              <Textarea
                id="completeAddress"
                value={formData.completeAddress}
                onChange={(e) => handleInputChange('completeAddress', e.target.value)}
                placeholder="Any additional address details, landmarks, or delivery instructions"
                rows={3}
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Package className="w-5 h-5 text-pink-500" />
              <h3 className="text-lg font-semibold">Order Summary</h3>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Items ({state.items.reduce((total, item) => total + item.quantity, 0)}):</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span className="text-pink-600">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold">Payment Method</h3>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <Truck className="w-5 h-5 text-green-500" />
              <span className="font-medium text-green-700">Cash on Delivery</span>
              <span className="text-sm text-gray-600">- Pay when you receive your order</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
            >
              {isSubmitting ? 'Processing...' : 'Confirm Order'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CODCheckout;
