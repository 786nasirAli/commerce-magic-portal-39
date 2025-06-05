
import React, { useState, useEffect } from 'react';
import { X, Gift, Clock } from 'lucide-react';

interface FestivalOffer {
  id: string;
  title: string;
  description: string;
  bannerColor: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const FestivalBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentOffer, setCurrentOffer] = useState<FestivalOffer | null>(null);

  // Sample festival offers
  const offers: FestivalOffer[] = [
    {
      id: '1',
      title: '🎉 Grand Opening Sale - 30% OFF',
      description: 'Celebrate with BAREEHA\'S ASSEMBLE! Use code: GRAND30',
      bannerColor: 'from-pink-500 to-rose-500',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      isActive: true
    },
    {
      id: '2',
      title: '✨ New Year Special - Free Shipping',
      description: 'Start the year elegantly! Free shipping on all orders',
      bannerColor: 'from-purple-500 to-pink-500',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      isActive: true
    }
  ];

  useEffect(() => {
    // Find active offers
    const activeOffer = offers.find(offer => offer.isActive);
    setCurrentOffer(activeOffer || null);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible || !currentOffer) {
    return null;
  }

  return (
    <div className={`bg-gradient-to-r ${currentOffer.bannerColor} text-white py-3 relative overflow-hidden`}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="flex space-x-8 animate-pulse">
          {[...Array(10)].map((_, i) => (
            <Gift key={i} className="w-6 h-6" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <Gift className="w-5 h-5 animate-bounce" />
            <div className="flex-1">
              <span className="font-bold text-lg">{currentOffer.title}</span>
              <span className="ml-4 text-sm opacity-90">{currentOffer.description}</span>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm opacity-90">
              <Clock className="w-4 h-4" />
              <span>Limited Time Offer</span>
            </div>
          </div>
          
          <button
            onClick={handleClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200 ml-4"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FestivalBanner;
