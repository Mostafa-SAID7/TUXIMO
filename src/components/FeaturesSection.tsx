import { Zap, Lock, Workflow, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Instant Downloads",
    description: "Get immediate access to all motion backgrounds. No waiting, no subscriptions – just download and use in your projects."
  },
  {
    icon: Lock,
    title: "Royalty-Free License",
    description: "All backgrounds are completely free to use in personal and commercial projects. No attribution required."
  },
  {
    icon: Workflow,
    title: "Seamless Integration",
    description: "Perfectly looping videos in multiple formats. Works with all major video editors and presentation software."
  },
  {
    icon: TrendingUp,
    title: "Growing Collection",
    description: "New motion backgrounds added regularly. Follow along to get notified when fresh content drops."
  }
];

const FeaturesSection = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon/10 border border-neon/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-neon"></div>
            <span className="text-sm text-neon font-medium">Why Use Our Backgrounds</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Premium Quality, Zero Cost
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Elevate your videos, presentations, and creative projects with 
            stunning cinematic motion backgrounds – completely free.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-neon/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon/10"
            >
              {/* Icon */}
              <div className="mb-6 w-14 h-14 rounded-xl bg-neon/10 flex items-center justify-center group-hover:bg-neon/20 transition-colors">
                <feature.icon className="w-7 h-7 text-neon" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
