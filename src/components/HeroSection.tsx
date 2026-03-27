import { motion } from "motion/react";
import FlightBookingForm from "./FlightBookingForm";

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 relative">
      {/* Large Airplane Image Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-[60%] opacity-80">
          <img
            src="/airplane-promo.png"
            alt="Airplane"
            className="w-full h-full object-contain"
            style={{
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
              transform: 'scaleX(-1)'
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Promotional Card */}
          <div className="lg:col-span-3">
            {/* Promotional Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
              className="max-w-xs"
            >
              <div className="bg-card rounded-2xl p-6 shadow-lg border border-border relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-foreground text-background text-xs font-bold px-3 py-1 rounded-full z-10">
                  -20%
                </div>
                <p className="text-sm font-medium text-foreground mb-4">
                  Elevate Your Journey With Us
                </p>
                <div className="relative w-full h-32 rounded-lg overflow-hidden">
                  <img
                    src="/airplane-hero.jpg"
                    alt="Airplane Front View"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-9">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: smoothEase }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 leading-tight">
                WHERE TO FLY?
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Find Countless Flights Options & Deals To Various Destinations Around The World
              </p>
            </motion.div>

            {/* Booking Section Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: smoothEase }}
              className="text-2xl md:text-3xl font-bold text-foreground mb-6"
            >
              Start Booking Your Flight Now
            </motion.h2>

            {/* Flight Booking Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: smoothEase }}
            >
              <FlightBookingForm />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
