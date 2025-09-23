import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, User } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProfileDialog } from "./ProfileDialog";
import { NotificationsDialog } from "./NotificationsDialog";

interface StreamingNavProps {
  onSearch?: (query: string) => void;
}

export const StreamingNav = ({ onSearch }: StreamingNavProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery.trim());
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-primary">MovieStream</h1>
            
            {/* Navigation links */}
            <div className="hidden md:flex items-center gap-6">
              <Button 
                variant="ghost" 
                className={`text-foreground hover:text-primary transition-colors ${
                  location.pathname === '/' ? 'text-primary font-medium' : ''
                }`}
                onClick={() => navigate('/')}
              >
                Home
              </Button>
              <Button 
                variant="ghost" 
                className={`text-foreground hover:text-primary transition-colors ${
                  location.pathname === '/movies' ? 'text-primary font-medium' : ''
                }`}
                onClick={() => navigate('/movies')}
              >
                Movies
              </Button>
              <Button 
                variant="ghost" 
                className={`text-foreground hover:text-primary transition-colors ${
                  location.pathname === '/tv-shows' ? 'text-primary font-medium' : ''
                }`}
                onClick={() => navigate('/tv-shows')}
              >
                TV Shows
              </Button>
              <Button 
                variant="ghost" 
                className={`text-foreground hover:text-primary transition-colors ${
                  location.pathname === '/my-list' ? 'text-primary font-medium' : ''
                }`}
                onClick={() => navigate('/my-list')}
              >
                My List
              </Button>
            </div>
          </div>
          
          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              {showSearch ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                    autoFocus
                    onBlur={() => {
                      if (!searchQuery) setShowSearch(false);
                    }}
                  />
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSearch(true)}
                  className="text-foreground hover:text-primary"
                >
                  <Search className="w-5 h-5" />
                </Button>
              )}
            </div>
            
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon"
              className="text-foreground hover:text-primary"
              onClick={() => setShowNotifications(true)}
            >
              <Bell className="w-5 h-5" />
            </Button>
            
            {/* Profile */}
            <Button 
              variant="ghost" 
              size="icon"
              className="text-foreground hover:text-primary"
              onClick={() => setShowProfile(true)}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Dialogs */}
      <ProfileDialog open={showProfile} onOpenChange={setShowProfile} />
      <NotificationsDialog open={showNotifications} onOpenChange={setShowNotifications} />
    </nav>
  );
};