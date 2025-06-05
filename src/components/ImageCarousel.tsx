
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CarouselImage {
  id: string;
  url: string;
  title: string;
  description: string;
}

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample promotional images for BAREEHA'S ASSEMBLE
  const images: CarouselImage[] = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=800&fit=crop',
      title: 'BAREEHA\'S ASSEMBLE',
      description: 'Fashion meets the elegance - Discover our exclusive collection'
    },
    {
      id: '2', 
      url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=800&fit=crop',
      title: 'Elegant Jewelry Collection',
      description: 'Exquisite pieces that define sophistication'
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=800&fit=crop',
      title: 'Luxury Bags & Accessories',
      description: 'Handcrafted elegance for the modern woman'
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&h=800&fit=crop',
      title: 'Fashion Forward Clothing',
      description: 'Where style meets comfort in perfect harmony'
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1920&h=800&fit=crop',
      title: 'Premium Footwear',
      description: 'Step into elegance with our curated shoe collection'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div 
      className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Images */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-center justify-start pl-8 md:pl-16">
              <div className="text-white max-w-2xl">
                <h1 className="text-3xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
                  {image.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-200">
                  {image.description}
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
