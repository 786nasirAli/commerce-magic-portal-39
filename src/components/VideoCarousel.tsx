
import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselVideo {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
}

const VideoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sample promotional videos for BAREEHA'S ASSEMBLE
  const videos: CarouselVideo[] = [
    {
      id: '1',
      videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761',
      thumbnailUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop',
      title: 'Jewelry Collection Showcase',
      description: 'Discover our exquisite jewelry pieces'
    },
    {
      id: '2',
      videoUrl: 'https://player.vimeo.com/external/291648067.sd.mp4?s=7f9c1d1d1f7b7b7b7b7b7b7b7b7b7b7b7b7b7b7b&profile_id=139',
      thumbnailUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
      title: 'Luxury Bags Presentation',
      description: 'Elegant bags for every occasion'
    },
    {
      id: '3',
      videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761',
      thumbnailUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=400&fit=crop',
      title: 'Fashion Lookbook',
      description: 'Style inspiration for the modern woman'
    },
    {
      id: '4',
      videoUrl: 'https://player.vimeo.com/external/291648067.sd.mp4?s=7f9c1d1d1f7b7b7b7b7b7b7b7b7b7b7b7b7b7b7b&profile_id=139',
      thumbnailUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop',
      title: 'Footwear Collection',
      description: 'Step into elegance with our shoes'
    }
  ];

  const currentVideo = videos[currentIndex];

  const nextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    setIsPlaying(false);
  };

  const prevVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const goToVideo = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Video Player */}
      <div className="relative bg-black rounded-lg overflow-hidden mb-6 group">
        <video
          ref={videoRef}
          className="w-full h-[50vh] object-cover"
          poster={currentVideo.thumbnailUrl}
          muted={isMuted}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={currentVideo.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Play/Pause Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </button>
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="text-white">
              <h3 className="font-semibold text-lg">{currentVideo.title}</h3>
              <p className="text-sm text-gray-300">{currentVideo.description}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevVideo}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextVideo}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Video Thumbnails */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {videos.map((video, index) => (
          <div
            key={video.id}
            onClick={() => goToVideo(index)}
            className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ${
              index === currentIndex 
                ? 'ring-2 ring-pink-500 scale-105' 
                : 'hover:scale-105 hover:ring-2 hover:ring-pink-300'
            }`}
          >
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-24 object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
              <h4 className="text-white text-xs font-semibold truncate">
                {video.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
