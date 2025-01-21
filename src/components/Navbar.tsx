import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
// import { Button } from "./ui/button";
import { Leaf } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2 mr-8">
          <Leaf className="w-6 h-6 text-crop-leaf" />
          <span className="font-bold text-xl">CropSage AI</span>
        </Link>

        <nav className="flex items-center space-x-6 mr-6">
          <Link
            to="/"
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            to="/training"
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            Training
          </Link>
          <Link
            to="/testing"
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            Testing
          </Link>
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
