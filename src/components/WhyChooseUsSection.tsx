import { motion } from "motion/react";
import { Check } from "lucide-react";

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const features = [
  {
    title: "Effortless flight search system",
    description: "Our platform finds the best flight options for you instantly, saving you time and effort with advanced search algorithms."
  },
  {
    title: "Transparent pricing with no hidden fees",
    description: "See exactly what you're paying for upfront. No surprises, no hidden charges - just honest, transparent pricing every time."
  },
  {
    title: "Multilingual customer service network",
    description: "Get support in your preferred language, anytime you need it. Our global team is ready to assist you 24/7."
  },
  {
    title: "Quality airline seats and experiences",
    description: "Choose from premium airlines offering comfortable seating, excellent service, and memorable flight experiences."
  },
  {
    title: "Effortless baggage quota selection",
    description: "Easily customize your baggage allowance to fit your travel needs without any hassle or confusion."
  },
  {
    title: "Real-time alerts and details",
    description: "Stay informed with instant notifications about flight changes, gate updates, and important travel information."
  }
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="relative mt-20"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/Why Choose Us.jpg"
                alt="Flight Attendant"
                className="w-full h-[600px] object-cover"
              />
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon/10 border border-neon/20">
              <div className="w-2 h-2 rounded-full bg-neon"></div>
              <span className="text-sm text-neon font-medium">Why Choose Us</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Experience comfort and safety in every flight you take
            </h2>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: smoothEase }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neon/20 flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-neon" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
