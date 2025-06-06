
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Upload, Trash2, Plus, Play, Eye } from 'lucide-react';
import { useSlider } from '@/contexts/SliderContext';

interface MediaManagerProps {
  type: 'images' | 'videos';
}

const MediaManager: React.FC<MediaManagerProps> = ({ type }) => {
  const {
    images,
    videos,
    addImage,
    addVideo,
    removeImage,
    removeVideo,
    toggleImageStatus,
    toggleVideoStatus
  } = useSlider();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  
  const [mediaForm, setMediaForm] = useState({
    title: '',
    description: '',
    url: '',
    thumbnailUrl: ''
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, fileType: 'image' | 'video' | 'thumbnail') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileUrl = e.target?.result as string;
        if (fileType === 'image' || fileType === 'video') {
          setMediaForm(prev => ({ ...prev, url: fileUrl }));
        } else if (fileType === 'thumbnail') {
          setMediaForm(prev => ({ ...prev, thumbnailUrl: fileUrl }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setMediaForm({
      title: '',
      description: '',
      url: '',
      thumbnailUrl: ''
    });
  };

  const handleSaveMedia = () => {
    if (!mediaForm.title || !mediaForm.description || !mediaForm.url) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (type === 'images') {
      const newImage = {
        id: Date.now().toString(),
        url: mediaForm.url,
        title: mediaForm.title,
        description: mediaForm.description,
        isActive: true
      };
      addImage(newImage);
      toast({
        title: "Image added!",
        description: `${mediaForm.title} has been added to the slider and will appear on homepage.`,
      });
    } else {
      const newVideo = {
        id: Date.now().toString(),
        videoUrl: mediaForm.url,
        thumbnailUrl: mediaForm.thumbnailUrl || mediaForm.url,
        title: mediaForm.title,
        description: mediaForm.description,
        isActive: true
      };
      addVideo(newVideo);
      toast({
        title: "Video added!",
        description: `${mediaForm.title} has been added to the video slider and will appear on homepage.`,
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDeleteMedia = (mediaId: string) => {
    if (window.confirm(`Are you sure you want to delete this ${type.slice(0, -1)}? It will be removed from the homepage immediately.`)) {
      if (type === 'images') {
        removeImage(mediaId);
      } else {
        removeVideo(mediaId);
      }
      toast({
        title: `${type.slice(0, -1).charAt(0).toUpperCase() + type.slice(1, -1)} deleted`,
        description: "Media has been removed from the slider and homepage.",
      });
    }
  };

  const toggleMediaStatus = (mediaId: string) => {
    if (type === 'images') {
      toggleImageStatus(mediaId);
    } else {
      toggleVideoStatus(mediaId);
    }
    toast({
      title: "Status updated",
      description: "Changes will be reflected on the homepage immediately.",
    });
  };

  const handlePreview = (item: any) => {
    setPreviewItem(item);
    setIsPreviewOpen(true);
  };

  const currentMedia = type === 'images' ? images : videos;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {type === 'images' ? '🖼️ Homepage Image Slider Management' : '🎥 Homepage Video Slider Management'}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm} className="bg-brand-pink hover:bg-brand-rose">
                  <Plus className="w-4 h-4 mr-2" />
                  Add {type === 'images' ? 'Image' : 'Video'}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    Add New {type === 'images' ? 'Image' : 'Video'} to Homepage Slider
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={mediaForm.title}
                        onChange={(e) => setMediaForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter title"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Input
                        id="description"
                        value={mediaForm.description}
                        onChange={(e) => setMediaForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter description"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label>{type === 'images' ? 'Image' : 'Video'} File</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => handleFileUpload(e, type === 'images' ? 'image' : 'video')}
                        accept={type === 'images' ? 'image/*' : 'video/*'}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="mb-4"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload {type === 'images' ? 'Image' : 'Video'}
                      </Button>
                      
                      {mediaForm.url && (
                        <div className="mt-2">
                          {type === 'images' ? (
                            <img
                              src={mediaForm.url}
                              alt="Preview"
                              className="w-32 h-24 object-cover rounded-lg"
                            />
                          ) : (
                            <video
                              src={mediaForm.url}
                              className="w-32 h-24 object-cover rounded-lg"
                              muted
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {type === 'videos' && (
                    <div>
                      <Label>Video Thumbnail</Label>
                      <div className="mt-2">
                        <input
                          type="file"
                          ref={videoInputRef}
                          onChange={(e) => handleFileUpload(e, 'thumbnail')}
                          accept="image/*"
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => videoInputRef.current?.click()}
                          className="mb-4"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Thumbnail
                        </Button>
                        
                        {mediaForm.thumbnailUrl && (
                          <img
                            src={mediaForm.thumbnailUrl}
                            alt="Thumbnail preview"
                            className="w-32 h-24 object-cover rounded-lg mt-2"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveMedia}>
                    Add to Homepage
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
          <CardDescription>
            Manage your homepage {type} slider content - changes appear immediately on the homepage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentMedia.map((item) => (
              <Card key={item.id} className={`overflow-hidden ${item.isActive ? 'ring-2 ring-green-500' : 'opacity-60'}`}>
                <div className="relative">
                  {type === 'images' ? (
                    <img
                      src={(item as any).url}
                      alt={item.title}
                      className="w-full h-32 object-cover"
                    />
                  ) : (
                    <div className="relative">
                      <img
                        src={(item as any).thumbnailUrl}
                        alt={item.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handlePreview(item)}
                      className="p-1 h-auto"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <Button
                      size="sm"
                      variant={item.isActive ? "default" : "outline"}
                      onClick={() => toggleMediaStatus(item.id)}
                      className="text-xs"
                    >
                      {item.isActive ? 'Live on Homepage' : 'Hidden'}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteMedia(item.id)}
                      className="p-1 h-auto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {currentMedia.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No {type} added yet. Add your first {type.slice(0, -1)} to get started!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{previewItem?.title}</DialogTitle>
          </DialogHeader>
          {previewItem && (
            <div className="space-y-4">
              {type === 'images' ? (
                <img
                  src={(previewItem as any).url}
                  alt={previewItem.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ) : (
                <video
                  src={(previewItem as any).videoUrl}
                  poster={(previewItem as any).thumbnailUrl}
                  controls
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
              <p className="text-gray-600">{previewItem.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaManager;
