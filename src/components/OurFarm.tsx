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

  // Fetch dynamic farm videos (category=farm_file, type=video)
  const backendOrigin = process.env.NEXT_PUBLIC_BACKEND_ORIGIN || "";
  type DynamicVideo = { id: string; title: string; url: string };
  const [dynamicVideos, setDynamicVideos] = useState<DynamicVideo[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchVideoAssets = async () => {
      if (!backendOrigin) return;
      try {
        const params = new URLSearchParams({
          page: "1",
          limit: "12",
          category: "farm_file",
          type: "video",
          isActive: "true",
        });
        const url = `${backendOrigin}/api/v1/assets?${params.toString()}`;
        const res = await fetch(url, { cache: "force-cache" });
        if (!res.ok) return;
        const json = await res.json();
        const items: Array<{ id: string; title?: string; url?: string }> =
          json?.data || [];
        const mapped: DynamicVideo[] = items
          .map((it) => {
            const raw = it?.url || "";
            if (!raw) return null;
            const absolute = /^https?:\/\//i.test(raw)
              ? raw
              : `${backendOrigin}${raw.startsWith("/") ? "" : "/"}${raw}`;
            return { id: it.id, title: it.title || "Our Farm", url: absolute };
          })
          .filter(Boolean) as DynamicVideo[];
        if (isMounted && mapped.length) setDynamicVideos(mapped);
      } catch {
        // silent fallback to static videos
      }
    };
    fetchVideoAssets();
    return () => {
      isMounted = false;
    };
  }, [backendOrigin]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentVideo((prev) => {
        const total = dynamicVideos.length || farmVideos.length;
        return (prev + 1) % total;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, dynamicVideos.length]);

  const nextVideo = () => {
    setCurrentVideo((prev) => {
      const total = dynamicVideos.length || farmVideos.length;
      return (prev + 1) % total;
    });
    setIsAutoPlaying(false);
    setIsPlaying(false);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => {
      const total = dynamicVideos.length || farmVideos.length;
      return (prev - 1 + total) % total;
    });
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

  // Decide source
  const usingDynamic = dynamicVideos.length > 0;
  const currentVideoData = usingDynamic
    ? {
        id: dynamicVideos[currentVideo % dynamicVideos.length].id,
        title: dynamicVideos[currentVideo % dynamicVideos.length].title,
        description: farmVideos[0].description,
        videoUrl: dynamicVideos[currentVideo % dynamicVideos.length].url,
        thumbnail: farmVideos[currentVideo % farmVideos.length].thumbnail,
        location: farmVideos[currentVideo % farmVideos.length].location,
        duration: farmVideos[currentVideo % farmVideos.length].duration,
      }
    : farmVideos[currentVideo % farmVideos.length];

  const isMp4 =
    /\.mp4(\?|$)/i.test(currentVideoData.videoUrl) ||
    /vietrootstorage/i.test(currentVideoData.videoUrl);

  const displayedThumbnail = currentVideoData.thumbnail;

  return (
    <section className="pt-16 pb-12 md:pt-18 md:pb-14 bg-gradient-to-br from-viet-earth-cream via-white to-viet-green-light/20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-viet-green-light/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-viet-earth-gold/10 rounded-full blur-3xl animate-float animation-delay-600"></div>
      </div>

      <div className="relative max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Side - Video and Images (2/3 width) */}
          <div className="lg:col-span-2 animate-fade-in-up animation-delay-400">
            {/* Main Video Player */}
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-viet-green-light/30 mb-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
                {/* Video/Thumbnail Display */}
                {isPlaying ? (
                  isMp4 ? (
                    <video
                      src={currentVideoData.videoUrl}
                      className="w-full h-full"
                      autoPlay
                      muted
                      loop
                      controls
                      playsInline
                      data-testid={`video-player-${currentVideoData.id}`}
                    />
                  ) : (
                    <iframe
                      src={`${currentVideoData.videoUrl}&autoplay=1`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      data-testid={`video-player-${currentVideoData.id}`}
                    />
                  )
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={displayedThumbnail}
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
            </div>

            {/* Three Thumbnail Images Below */}
            <div className="grid grid-cols-3 gap-4">
              {farmVideos.slice(0, 3).map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => goToVideo(index)}
                  className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                    index === currentVideo
                      ? "border-viet-green-medium shadow-lg"
                      : "border-gray-200 hover:border-viet-green-light"
                  }`}
                  data-testid={`video-thumbnail-button-${index}`}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Content (1/3 width) */}
          <div className="lg:col-span-1 animate-fade-in-up animation-delay-600">
            <div className="relative flex flex-col items-center text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-viet-green-medium to-viet-green-dark rounded-full mb-6 animate-float shadow-2xl">
                <Sprout className="h-6 w-6 text-white" />
              </div>

              {/* Title */}
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-viet-green-dark mb-4"
                data-testid="text-farm-title"
              >
                Our Farm
              </h2>

              {/* Underline */}
              <div className="w-32 h-1 bg-gradient-to-r from-viet-green-medium to-viet-earth-gold rounded-full mb-6 shadow-lg"></div>

              {/* Subtitle */}
              <h3 className="text-xl md:text-2xl font-semibold text-viet-green-dark mb-8">
                Bridging Vietnam's trusted growers to the world
              </h3>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8 text-left w-full">
                At VIETROOT, we proudly connect skilled, responsible farms across Vietnam with snack lovers everywhere. We champion sustainable methods, full traceability, and fair partnerships, so every bite carries the pride of Vietnamese agriculture from farm to snack.
              </p>

              {/* By the numbers */}
              <h4 className="text-lg font-semibold text-viet-green-dark mb-4 text-left w-full">
                By the numbers
              </h4>

              {/* Stats with Icons */}
              <div className="space-y-4 w-full">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-viet-green-dark rounded-full flex items-center justify-center">
                    <Sprout className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-base text-gray-700 leading-relaxed">
                      <span className="font-semibold">50+ Partner Farms</span> across key growing regions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-viet-green-dark rounded-full flex items-center justify-center">
                    <Sprout className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-base text-gray-700 leading-relaxed">
                      <span className="font-semibold">100% VietGAP Standard</span> for products we source
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-viet-green-dark rounded-full flex items-center justify-center">
                    <Sprout className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-base text-gray-700 leading-relaxed">
                      <span className="font-semibold">70% USDA Organic</span> Certified and growing
                    </p>
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
