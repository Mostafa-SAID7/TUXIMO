import { Plane } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/30 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-neon rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-background" />
              </div>
              <span className="text-xl font-bold text-neon">AeroLink</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Offers travel planning support, reliable booking, and seamless travel experiences.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-muted-foreground hover:text-neon transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-muted-foreground hover:text-neon transition-colors text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="/hotels" className="text-muted-foreground hover:text-neon transition-colors text-sm">
                  Hotels & Meal
                </a>
              </li>
              <li>
                <a href="/cars" className="text-muted-foreground hover:text-neon transition-colors text-sm">
                  Rent Carreer
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Social Media</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-neon transition-colors text-sm">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-neon transition-colors text-sm">
                  Tiktok
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-neon transition-colors text-sm">
                  Youtube
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-neon transition-colors text-sm">
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="/support" className="text-muted-foreground hover:text-neon transition-colors text-sm">
                  Help
                </a>
              </li>
              <li>
                <a href="/support" className="text-muted-foreground hover:text-neon transition-colors text-sm">
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-neon transition-colors text-sm">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2025 AeroLink. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-neon transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-neon transition-colors text-sm">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
