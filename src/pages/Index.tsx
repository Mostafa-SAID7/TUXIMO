import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import VideoCardsSection from "@/components/VideoCardsSection";
import FeaturesSection from "@/components/FeaturesSection";
import { useEffect, useRef } from "react";

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const scrollPosition = window.scrollY;
        const maxScroll = 300; // Distance to reach 30% opacity
        const opacity = Math.max(0.3, 1 - (scrollPosition / maxScroll) * 0.7);
        videoRef.current.style.opacity = opacity.toString();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Full-screen video background with hard-light blend mode */}
      <div 
        className="fixed inset-0 w-screen h-screen overflow-hidden" 
        style={{ 
          isolation: 'isolate',
          zIndex: 0 
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-opacity duration-300"
          style={{ 
            mixBlendMode: 'hard-light',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            filter: 'brightness(0.7) contrast(2)'
          }}
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Navbar overlays video */}
      <div style={{ position: 'relative', zIndex: 50 }}>
        <Navigation />
      </div>

      {/* Hero content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <HeroSection />
        <VideoCardsSection />
        <FeaturesSection />
      </div>
    </div>
  );
};

export default Index;
