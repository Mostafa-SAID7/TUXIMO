import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "motion/react";
import { Plane, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navigation />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-neon/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-neon/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="flex min-h-screen items-center justify-center px-6 pt-20">
        <div className="text-center max-w-2xl relative z-10">
          {/* Animated Plane Icon */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8 flex justify-center"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="bg-neon/10 border border-neon/20 rounded-full p-8"
            >
              <Plane className="w-20 h-20 text-neon" />
            </motion.div>
          </motion.div>

          {/* 404 Text */}
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-8xl md:text-9xl font-bold text-neon mb-6"
          >
            404
          </motion.h1>

          {/* Message */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Flight Path Not Found
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Oops! Looks like this destination doesn't exist. Let's get you back on track.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/">
              <Button
                size="lg"
                className="bg-neon text-background hover:bg-neon/90 rounded-full px-8 transition-all hover:scale-105"
              >
                <Home className="w-5 h-5 mr-2" />
                Return to Home
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-neon/20 text-neon hover:bg-neon/10 rounded-full px-8 transition-all hover:scale-105"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </motion.div>

          {/* Animated Path */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 text-sm text-muted-foreground font-mono"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Path: {location.pathname}
            </motion.span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
