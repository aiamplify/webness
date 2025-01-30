import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BookOpen, User, Moon, Sun, Menu, Search, Bell, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useIsMobile } from "../hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { toast } from "./ui/use-toast";

const Header = () => {
  const isMobile = useIsMobile();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications] = useState([
    "New article published: 'The Future of AI'",
    "Your bookmarked article was updated",
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    toast({
      title: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode enabled`,
      description: `Switched to ${newTheme} theme`,
    });
  };

  const handleNotificationClick = (notification: string) => {
    toast({
      title: "Notification",
      description: notification,
    });
  };

  const NavLinks = () => (
    <>
      <Link 
        to="/about" 
        className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors"
      >
        <User className="w-5 h-5" />
        <span>About</span>
      </Link>
      <Link 
        to="/resources" 
        className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors"
      >
        <BookOpen className="w-5 h-5" />
        <span>Resources</span>
      </Link>
      <Link 
        to="/art-gallery" 
        className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors"
      >
        <span>AI Art Gallery</span>
      </Link>
      <Link 
        to="/projects" 
        className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors"
      >
        <Briefcase className="w-5 h-5" />
        <span>Projects</span>
      </Link>
      <Link
        to="/video-training"
        className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors"
      >
        <span>Video Training</span>
      </Link>
    </>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "glass-card shadow-lg" : "bg-transparent"
    }`}>
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-hover to-purple-500 bg-clip-text text-transparent">
              Mike Eckmeier - A.I. Engineer
            </span>
          </Link>
          
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-blog-dark border-blog-accent">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="flex items-center space-x-8">
              <NavLinks />
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="w-5 h-5" />
                      {notifications.length > 0 && (
                        <Badge 
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                          variant="destructive"
                        >
                          {notifications.length}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 bg-blog-dark border-blog-accent">
                    {notifications.map((notification, index) => (
                      <DropdownMenuItem
                        key={index}
                        className="text-sm text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => handleNotificationClick(notification)}
                      >
                        {notification}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="icon">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
