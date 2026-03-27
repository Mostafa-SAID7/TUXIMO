import { motion } from "motion/react";
import { Headphones, Mail, Phone, MessageCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const Support = () => {
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
              <span className="text-sm text-neon font-medium">Customer Support</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              We're Here to Help
            </h1>
            <p className="text-lg md:text-xl text-neon max-w-3xl mx-auto">
              Get in touch with our support team for any questions or assistance
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
            >
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-neon/20">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
                
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-muted-foreground">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="mt-2 bg-background border-border focus:border-neon transition-colors"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-muted-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="mt-2 bg-background border-border focus:border-neon transition-colors"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-muted-foreground">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      rows={6}
                      className="mt-2 bg-background border-border focus:border-neon transition-colors"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-neon text-background hover:bg-neon/90 rounded-full"
                  >
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: smoothEase }}
              className="space-y-6"
            >
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-neon/20">
                <div className="flex items-start gap-4">
                  <div className="bg-neon/10 rounded-full p-4">
                    <Phone className="w-6 h-6 text-neon" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-sm text-muted-foreground mt-1">Mon-Fri 9am-6pm EST</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-card/50 backdrop-blur-sm border-neon/20">
                <div className="flex items-start gap-4">
                  <div className="bg-neon/10 rounded-full p-4">
                    <Mail className="w-6 h-6 text-neon" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Email</h3>
                    <p className="text-muted-foreground">support@tuximo.com</p>
                    <p className="text-sm text-muted-foreground mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-card/50 backdrop-blur-sm border-neon/20">
                <div className="flex items-start gap-4">
                  <div className="bg-neon/10 rounded-full p-4">
                    <MessageCircle className="w-6 h-6 text-neon" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Live Chat</h3>
                    <p className="text-muted-foreground">Chat with our team</p>
                    <p className="text-sm text-muted-foreground mt-1">Available 24/7</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
