import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-border/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Setrex Logo" className="h-6" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-neon transition-colors">
              Gallery
            </Link>
            <a 
              href="https://viktoroddy.substack.com/p/5-quick-examples-of-really-good-motion" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:text-neon transition-colors"
            >
              Download
            </a>
            <a 
              href="https://x.com/viktoroddy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:text-neon transition-colors"
            >
              Twitter
            </a>
          </div>

          {/* CTA Button */}
          <a 
            href="https://viktoroddy.substack.com/p/5-quick-examples-of-really-good-motion"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
              variant="outline" 
              className="hidden md:inline-flex border-foreground/20 hover:border-neon hover:text-neon transition-all"
            >
              Access Gallery
            </Button>
          </a>

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
