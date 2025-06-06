
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SliderImage {
  id: string;
  url: string;
  title: string;
  description: string;
  isActive: boolean;
}

interface SliderVideo {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  isActive: boolean;
}

interface SliderContextType {
  images: SliderImage[];
  videos: SliderVideo[];
  setImages: (images: SliderImage[]) => void;
  setVideos: (videos: SliderVideo[]) => void;
  addImage: (image: SliderImage) => void;
  addVideo: (video: SliderVideo) => void;
  removeImage: (imageId: string) => void;
  removeVideo: (videoId: string) => void;
  toggleImageStatus: (imageId: string) => void;
  toggleVideoStatus: (videoId: string) => void;
  getActiveImages: () => SliderImage[];
  getActiveVideos: () => SliderVideo[];
}

const SliderContext = createContext<SliderContextType | undefined>(undefined);

interface SliderProviderProps {
  children: ReactNode;
}

export const SliderProvider: React.FC<SliderProviderProps> = ({ children }) => {
  const [images, setImages] = useState<SliderImage[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=800&fit=crop',
      title: 'BAREEHA\'S ASSEMBLE',
      description: 'Fashion meets the elegance - Discover our exclusive collection',
      isActive: true
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=800&fit=crop',
      title: 'Elegant Jewelry Collection',
      description: 'Exquisite pieces that define sophistication',
      isActive: true
    }
  ]);

  const [videos, setVideos] = useState<SliderVideo[]>([
    {
      id: '1',
      videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761',
      thumbnailUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop',
      title: 'Jewelry Collection Showcase',
      description: 'Discover our exquisite jewelry pieces',
      isActive: true
    }
  ]);

  const addImage = (image: SliderImage) => {
    setImages(prev => [...prev, image]);
  };

  const addVideo = (video: SliderVideo) => {
    setVideos(prev => [...prev, video]);
  };

  const removeImage = (imageId: string) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const removeVideo = (videoId: string) => {
    setVideos(prev => prev.filter(vid => vid.id !== videoId));
  };

  const toggleImageStatus = (imageId: string) => {
    setImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, isActive: !img.isActive } : img
    ));
  };

  const toggleVideoStatus = (videoId: string) => {
    setVideos(prev => prev.map(vid => 
      vid.id === videoId ? { ...vid, isActive: !vid.isActive } : vid
    ));
  };

  const getActiveImages = () => {
    return images.filter(img => img.isActive);
  };

  const getActiveVideos = () => {
    return videos.filter(vid => vid.isActive);
  };

  const value = {
    images,
    videos,
    setImages,
    setVideos,
    addImage,
    addVideo,
    removeImage,
    removeVideo,
    toggleImageStatus,
    toggleVideoStatus,
    getActiveImages,
    getActiveVideos
  };

  return (
    <SliderContext.Provider value={value}>
      {children}
    </SliderContext.Provider>
  );
};

export const useSlider = () => {
  const context = useContext(SliderContext);
  if (context === undefined) {
    throw new Error('useSlider must be used within a SliderProvider');
  }
  return context;
};
