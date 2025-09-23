import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Settings, LogOut, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";  // 👈 import navigation hook

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProfileDialog = ({ open, onOpenChange }: ProfileDialogProps) => {
  const navigate = useNavigate(); // 👈 initialize navigation

  const handleSignOut = () => {
    localStorage.removeItem("auth"); // clear auth token/session
    onOpenChange(false); // close dialog
    navigate("/signin"); // redirect to sign-in page
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                JD
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">John Doe</h3>
              <p className="text-muted-foreground">john.doe@example.com</p>
              <div className="flex items-center gap-1 mt-1">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-yellow-500 font-medium">Premium</span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Quick Actions */}
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="w-4 h-4" />
              Account Settings
            </Button>
            
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Crown className="w-4 h-4" />
              Manage Subscription
            </Button>
            
            <Separator />
            
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-destructive hover:text-destructive"
              onClick={handleSignOut} // 👈 added click handler
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
