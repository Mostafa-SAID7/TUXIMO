import { motion } from "motion/react";
import { Hotel, MapPin, Star, Wifi, Coffee, Dumbbell } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const Hotels = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon/10 border border-neon/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-neon"></div>
              <span className="text-sm text-neon font-medium">Hotels</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              Find Your Perfect Stay
            </h1>
            <p className="text-lg md:text-xl text-neon max-w-3xl mx-auto">
              Discover comfortable accommodations worldwide with exclusive deals and premium amenities
            </p>
          </motion.div>

          {/* Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-12 bg-card/50 backdrop-blur-sm border-neon/20 text-center">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-8 flex justify-center"
              >
                <div className="bg-neon/10 border border-neon/20 rounded-full p-8">
                  <Hotel className="w-20 h-20 text-neon" />
                </div>
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Hotel Booking Coming Soon
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're working hard to bring you the best hotel booking experience. Stay tuned!
              </p>

              {/* Features Preview */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-neon/10 rounded-full p-4">
                    <MapPin className="w-6 h-6 text-neon" />
                  </div>
                  <p className="text-sm text-muted-foreground">Worldwide Locations</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-neon/10 rounded-full p-4">
                    <Star className="w-6 h-6 text-neon" />
                  </div>
                  <p className="text-sm text-muted-foreground">Premium Quality</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-neon/10 rounded-full p-4">
                    <Wifi className="w-6 h-6 text-neon" />
                  </div>
                  <p className="text-sm text-muted-foreground">Modern Amenities</p>
                </div>
              </div>

              <Button
                size="lg"
                className="mt-8 bg-neon text-background hover:bg-neon/90 rounded-full px-8"
                onClick={() => window.location.href = '/'}
              >
                Back to Home
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
