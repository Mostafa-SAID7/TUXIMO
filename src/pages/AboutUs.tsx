import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Target, Rocket, Award } from "lucide-react";
import { useEffect, useRef } from "react";

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "50M+", label: "Workflows Automated" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "150+", label: "Countries Worldwide" }
];

const values = [
  {
    icon: Users,
    title: "Customer First",
    description: "We build solutions that solve real problems for real people. Your success is our mission."
  },
  {
    icon: Target,
    title: "Innovation Driven",
    description: "Pushing boundaries with cutting-edge AI and automation technology that stays ahead of the curve."
  },
  {
    icon: Rocket,
    title: "Speed & Quality",
    description: "Fast deployment without compromising on security, reliability, or user experience."
  },
  {
    icon: Award,
    title: "Excellence Always",
    description: "We hold ourselves to the highest standards in everything we do, from code to customer support."
  }
];

const AboutUs = () => {
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
      {/* Video Background */}
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

      {/* Navbar */}
      <div style={{ position: 'relative', zIndex: 50 }}>
        <Navigation />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon/10 border border-neon/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-neon"></div>
              <span className="text-sm text-neon font-medium">About Setrex</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Building the Future of Intelligent Automation
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              We're on a mission to help businesses eliminate repetitive work and focus on what truly matters—innovation, growth, and human creativity.
            </p>

            <Button 
              size="lg" 
              className="bg-neon text-accent-foreground hover:bg-neon-glow neon-glow font-semibold text-lg px-8 py-6 rounded-full"
            >
              Join Our Journey
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-neon mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Founded in 2023, Setrex was born from a simple observation: businesses were drowning in repetitive tasks, losing valuable time that could be spent on strategy, innovation, and growth.
              </p>
              <p>
                Our founders, a team of engineers and automation experts from leading tech companies, set out to create a platform that would make enterprise-grade automation accessible to everyone—from startups to Fortune 500 companies.
              </p>
              <p>
                Today, we're proud to serve over 10,000 businesses worldwide, automating millions of workflows and saving countless hours of manual work every single day.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-neon/50 transition-all duration-300"
                >
                  <div className="mb-4 w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-neon" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of teams already automating their way to success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-neon text-accent-foreground hover:bg-neon-glow neon-glow font-semibold text-lg px-8 py-6 rounded-full"
              >
                Get Started Free
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-foreground/20 hover:border-neon hover:text-neon text-foreground font-semibold text-lg px-8 py-6 rounded-full"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
