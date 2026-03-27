import { motion } from "motion/react";

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const AboutSection = () => {
  return (
    <div className="container mx-auto px-6  pb-4 space-y-24">
      {/* About Us Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon/10 border border-neon/20 mb-8">
          <div className="w-2 h-2 rounded-full bg-neon"></div>
          <span className="text-sm text-neon font-medium">About Us</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
          Find your next destination with{" "}
          <span className="inline-flex items-center align-middle">
            <img 
              src="/1.jpg" 
              alt="Travel" 
              className="inline-block w-16 h-10 md:w-24 md:h-14 object-cover rounded-full align-middle"
              style={{ verticalAlign: 'middle' }}
            />
          </span>{" "}
          ease.
        </h2>
        
        <p className="text-2xl md:text-3xl lg:text-4xl text-foreground mb-4">
          From ticket search to check-in, we
        </p>
        
        <p className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground">
          simplify every step of your travel. Enjoy
        </p>
        
        <p className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground">
          smooth skies and seamless experiences.
        </p>
      </motion.section>

      {/* Explore Flights Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: smoothEase, delay: 0.2 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon/10 border border-neon/20 mb-8">
          <div className="w-2 h-2 rounded-full bg-neon"></div>
          <span className="text-sm text-neon font-medium">Explore Flights</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-4xl mx-auto leading-tight">
          Find your dream flight with comfort and explore routes while enjoying seamless booking today
        </h2>
      </motion.section>
    </div>
  );
};

export default AboutSection;
