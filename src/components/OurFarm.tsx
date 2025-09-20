"use client";
import { useState, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";

const farmVideos = [
  {
    id: 1,
    title: "Organic Rice Farming",
    description:
      "Traditional rice cultivation methods passed down through generations in the fertile Mekong Delta.",
    videoUrl:
      "https://player.vimeo.com/video/176916362?background=1&autoplay=1&loop=1&muted=1",
    thumbnail:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    location: "Mekong Delta",
    duration: "2:30",
  },
  {
    id: 2,
    title: "Mountain Tea Gardens",
    description:
      "High-altitude tea plantations where morning mist creates the perfect environment for premium tea leaves.",
    videoUrl:
      "https://player.vimeo.com/video/347119375?background=1&autoplay=1&loop=1&muted=1",
    thumbnail:
      "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    location: "Sapa Mountains",
    duration: "3:15",
  },
  {
    id: 3,
    title: "Fruit Orchards",
    description:
      "Organic fruit cultivation using sustainable farming practices that preserve soil health and biodiversity.",
    videoUrl:
      "https://player.vimeo.com/video/285086929?background=1&autoplay=1&loop=1&muted=1",
    thumbnail:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    location: "Central Highlands",
    duration: "4:20",
  },
  {
    id: 4,
    title: "Vegetable Gardens",
    description:
      "Chemical-free vegetable farming where every crop is nurtured with care and traditional wisdom.",
    videoUrl:
      "https://player.vimeo.com/video/434045692?background=1&autoplay=1&loop=1&muted=1",
    thumbnail:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    location: "Northern Valleys",
    duration: "3:45",
  },
];

export default function OurFarm() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % farmVideos.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % farmVideos.length);
    setIsAutoPlaying(false);
    setIsPlaying(false);
  };

  const prevVideo = () => {
    setCurrentVideo(
      (prev) => (prev - 1 + farmVideos.length) % farmVideos.length
    );
    setIsAutoPlaying(false);
    setIsPlaying(false);
  };

  const goToVideo = (index: number) => {
    setCurrentVideo(index);
    setIsAutoPlaying(false);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const currentVideoData = farmVideos[currentVideo];

  return (
    <section className="pt-24 pb-16 md:pt-24 md:pb-16 bg-gradient-to-br from-viet-earth-cream via-white to-viet-green-light/20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-viet-green-light/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-viet-earth-gold/10 rounded-full blur-3xl animate-float animation-delay-600"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-viet-green-medium to-viet-green-dark rounded-full mb-6 animate-float shadow-2xl">
            <Sprout className="h-6 w-6 text-white" />
          </div>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-viet-green-dark mb-6 animate-fade-in-up"
            data-testid="text-farm-title"
          >
            Our Farm
          </h2>
          <p
            className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200"
            data-testid="text-farm-subtitle"
          >
            Discover the authentic farming practices that make our products
            extraordinary
          </p>
          <div className="w-32 h-2 bg-gradient-to-r from-viet-green-medium to-viet-earth-gold mx-auto rounded-full mt-6 animate-fade-in-up animation-delay-400 shadow-lg"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Video Player */}
          <div className="animate-fade-in-up animation-delay-400">
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-viet-green-light/30">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
                {/* Video/Thumbnail Display */}
                {isPlaying ? (
                  <iframe
                    src={`${currentVideoData.videoUrl}&autoplay=1`}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    data-testid={`video-player-${currentVideoData.id}`}
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={currentVideoData.thumbnail}
                      alt={currentVideoData.title}
                      className="w-full h-full object-cover"
                      data-testid={`video-thumbnail-${currentVideoData.id}`}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Button
                        onClick={togglePlay}
                        className="bg-white/90 hover:bg-white text-viet-green-dark rounded-full w-16 h-16 p-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
                        data-testid="button-play-video"
                      >
                        <Play className="h-8 w-8 ml-1" />
                      </Button>
                    </div>

                    {/* Video Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
                        <h3 className="text-white font-semibold text-lg">
                          {currentVideoData.title}
                        </h3>
                        <div className="flex items-center justify-between text-white/80 text-sm mt-1">
                          <span>{currentVideoData.location}</span>
                          <span>{currentVideoData.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Arrows */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevVideo}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full w-10 h-10 p-0 transition-all duration-300"
                  data-testid="button-prev-video"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextVideo}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full w-10 h-10 p-0 transition-all duration-300"
                  data-testid="button-next-video"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Video Dots Indicator */}
              <div className="flex justify-center space-x-3 mt-6">
                {farmVideos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToVideo(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentVideo
                        ? "bg-viet-green-medium scale-125 shadow-lg"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    data-testid={`video-dot-${index}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right - Video Description */}
          <div className="animate-fade-in-up animation-delay-600">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-viet-green-light/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-viet-green-medium/5 rounded-full -translate-y-16 translate-x-16"></div>

              <div className="relative">
                <div className="mb-6">
                  <span className="inline-block bg-viet-green-medium/10 text-viet-green-dark px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {currentVideoData.location}
                  </span>
                  <h3
                    className="text-2xl lg:text-3xl font-bold text-viet-green-dark mb-4"
                    data-testid="text-current-video-title"
                  >
                    {currentVideoData.title}
                  </h3>
                </div>

                <p
                  className="text-lg text-gray-700 leading-relaxed mb-6"
                  data-testid="text-current-video-description"
                >
                  {currentVideoData.description}
                </p>

                {/* Farm Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-viet-green-light/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-viet-green-dark">
                      50+
                    </div>
                    <div className="text-sm text-gray-600">Partner Farms</div>
                  </div>
                  <div className="bg-viet-earth-gold/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-viet-green-dark">
                      100%
                    </div>
                    <div className="text-sm text-gray-600">
                      Organic Certified
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
