import { motion } from "motion/react";
import { LogIn, Mail, Lock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const Login = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: smoothEase }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon/10 border border-neon/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-neon"></div>
                <span className="text-sm text-neon font-medium">Welcome Back</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Log In
              </h1>
              <p className="text-lg text-muted-foreground">
                Access your account to manage bookings
              </p>
            </motion.div>

            {/* Login Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
            >
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-neon/20">
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-muted-foreground">Email Address</Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10 bg-background border-border focus:border-neon transition-colors h-12"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="password" className="text-muted-foreground">Password</Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10 bg-background border-border focus:border-neon transition-colors h-12"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-border" />
                      <span className="text-muted-foreground">Remember me</span>
                    </label>
                    <a href="#" className="text-neon hover:text-neon/80 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                  
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-neon text-background hover:bg-neon/90 rounded-full h-12"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Log In
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <a href="#" className="text-neon hover:text-neon/80 transition-colors font-medium">
                      Sign up
                    </a>
                  </p>
                </div>

                {/* Social Login */}
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="border-border hover:border-neon/50 hover:bg-neon/5 transition-colors"
                    >
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      className="border-border hover:border-neon/50 hover:bg-neon/5 transition-colors"
                    >
                      Facebook
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
