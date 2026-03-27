import { motion } from "motion/react";
import { Car, Shield, Clock, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const Cars = () => {
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
              <span className="text-sm text-neon font-medium">Car Rentals</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              Rent Your Dream Car
            </h1>
            <p className="text-lg md:text-xl text-neon max-w-3xl mx-auto">
              Choose from a wide selection of vehicles for your journey with flexible rental options
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
                  x: [0, 10, 0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-8 flex justify-center"
              >
                <div className="bg-neon/10 border border-neon/20 rounded-full p-8">
                  <Car className="w-20 h-20 text-neon" />
                </div>
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Car Rental Service Coming Soon
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're preparing an amazing car rental experience for you. Check back soon!
              </p>

              {/* Features Preview */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-neon/10 rounded-full p-4">
                    <Shield className="w-6 h-6 text-neon" />
                  </div>
                  <p className="text-sm text-muted-foreground">Full Insurance</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-neon/10 rounded-full p-4">
                    <Clock className="w-6 h-6 text-neon" />
                  </div>
                  <p className="text-sm text-muted-foreground">24/7 Support</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-neon/10 rounded-full p-4">
                    <MapPin className="w-6 h-6 text-neon" />
                  </div>
                  <p className="text-sm text-muted-foreground">Multiple Locations</p>
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

      <Footer />
    </div>
  );
};

export default Cars;
