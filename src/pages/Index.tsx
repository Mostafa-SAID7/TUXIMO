import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import VideoCardsSection from "@/components/VideoCardsSection";
import FeaturesSection from "@/components/FeaturesSection";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Full-screen image background */}
      <div 
        className="fixed inset-0 w-screen h-screen overflow-hidden" 
        style={{ 
          isolation: 'isolate',
          zIndex: 0 
        }}
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/airplane-hero.jpg)',
            filter: 'brightness(0.95) contrast(1.1)',
            opacity: 0.4
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95" />
      </div>

      {/* Navbar overlays background */}
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
