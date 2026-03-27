import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plane } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-foreground text-background rounded-full p-2">
              <Plane className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">TUXIMO</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="px-6 py-2 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/hotels" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Hotels
            </Link>
            <Link 
              to="/cars" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Cars
            </Link>
            <Link 
              to="/support" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Customer Supports
            </Link>
          </div>

          {/* Log In Button */}
          <Button 
            className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6"
          >
            Log In
          </Button>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
