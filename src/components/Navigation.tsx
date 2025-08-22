import { Leaf, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center" data-testid="nav-logo">
            <a href="/" className="flex-shrink-0 flex items-center">
              <Leaf className="text-viet-green-medium h-6 w-6 mr-2" />
              <span className="font-bold text-xl text-viet-green-dark">VietRoot</span>
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              <a 
                href="/" 
                className="relative text-gray-700 hover:text-viet-green-medium transition-all duration-300 px-4 py-2 text-sm font-medium group"
                data-testid="nav-home"
              >
                <span className="relative z-10">Home</span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-viet-green-medium to-viet-earth-gold transform -translate-x-1/2 group-hover:w-full transition-all duration-300 ease-out"></div>
              </a>
              <a 
                href="/products" 
                className="relative text-gray-700 hover:text-viet-green-medium transition-all duration-300 px-4 py-2 text-sm font-medium group"
                data-testid="nav-products"
              >
                <span className="relative z-10">Products</span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-viet-green-medium to-viet-earth-gold transform -translate-x-1/2 group-hover:w-full transition-all duration-300 ease-out"></div>
              </a>
              <a 
                href="/about" 
                className="relative text-gray-700 hover:text-viet-green-medium transition-all duration-300 px-4 py-2 text-sm font-medium group"
                data-testid="nav-about"
              >
                <span className="relative z-10">About Us</span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-viet-green-medium to-viet-earth-gold transform -translate-x-1/2 group-hover:w-full transition-all duration-300 ease-out"></div>
              </a>
              <a 
                href="/impact" 
                className="relative text-gray-700 hover:text-viet-green-medium transition-all duration-300 px-4 py-2 text-sm font-medium group"
                data-testid="nav-impact"
              >
                <span className="relative z-10">Impact</span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-viet-green-medium to-viet-earth-gold transform -translate-x-1/2 group-hover:w-full transition-all duration-300 ease-out"></div>
              </a>
              <a 
                href="/partnerships" 
                className="relative text-gray-700 hover:text-viet-green-medium transition-all duration-300 px-4 py-2 text-sm font-medium group"
                data-testid="nav-partnerships"
              >
                <span className="relative z-10">Partnership</span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-viet-green-medium to-viet-earth-gold transform -translate-x-1/2 group-hover:w-full transition-all duration-300 ease-out"></div>
              </a>
              <a 
                href="/blog" 
                className="relative text-gray-700 hover:text-viet-green-medium transition-all duration-300 px-4 py-2 text-sm font-medium group"
                data-testid="nav-blog"
              >
                <span className="relative z-10">Blog</span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-viet-green-medium to-viet-earth-gold transform -translate-x-1/2 group-hover:w-full transition-all duration-300 ease-out"></div>
              </a>
              <a 
                href="/contact" 
                className="relative text-gray-700 hover:text-viet-green-medium transition-all duration-300 px-4 py-2 text-sm font-medium group"
                data-testid="nav-contact"
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-viet-green-medium to-viet-earth-gold transform -translate-x-1/2 group-hover:w-full transition-all duration-300 ease-out"></div>
              </a>
            </div>
          </div>
          
          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button 
              className="bg-viet-green-medium hover:bg-viet-green-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
              data-testid="button-cart"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Cart</span>
            </Button>
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="sm"
              className="md:hidden text-gray-700 hover:text-viet-green-medium"
              data-testid="button-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
