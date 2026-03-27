import { motion } from "motion/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 px-6 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: smoothEase }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon/10 border border-neon/20 mb-8">
            <div className="w-2 h-2 rounded-full bg-neon"></div>
            <span className="text-sm text-neon font-medium">Testimonial</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our travelers share their stories
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground">
            and amazing flight journeys
          </h3>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Hear from our satisfied customers about their unforgettable experiences and seamless journeys with us
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
          className="relative"
        >
          {/* Testimonial Card */}
          <div className="bg-background border border-border rounded-2xl p-8 md:p-12 relative">
            <Quote className="w-16 h-16 text-neon/20 absolute top-8 left-8" />
            
            <div className="relative z-10 mt-8">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-xl text-foreground leading-relaxed mb-8"
              >
                {testimonials[currentIndex].text}
              </motion.p>

              <motion.div
                key={`author-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-neon/20 flex items-center justify-center">
                  <span className="text-neon font-bold text-lg">
                    {testimonials[currentIndex].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonials[currentIndex].name}
                  </p>
                </div>
              </motion.div>
            </div>

            <Quote className="w-16 h-16 text-neon/20 absolute bottom-8 right-8 rotate-180" />
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border border-border bg-card hover:bg-neon hover:border-neon transition-all duration-300 flex items-center justify-center group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-background" />
            </button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-neon w-8"
                      : "bg-border hover:bg-neon/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border border-border bg-card hover:bg-neon hover:border-neon transition-all duration-300 flex items-center justify-center group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-foreground group-hover:text-background" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
