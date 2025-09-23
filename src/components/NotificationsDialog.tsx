import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bell, Trash2, Star, Play, Calendar } from "lucide-react";

interface NotificationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockNotifications = [
  {
    id: 1,
    type: "new_episode",
    title: "New Episode Available",
    message: "Stranger Things Season 5, Episode 1 is now available",
    time: "2 hours ago",
    unread: true,
    icon: Play
  },
  {
    id: 2,
    type: "recommendation",
    title: "New Recommendation",
    message: "Based on your viewing history, you might like 'The Batman'",
    time: "1 day ago",
    unread: true,
    icon: Star
  },
  {
    id: 3,
    type: "reminder",
    title: "Coming Soon",
    message: "Dune: Part Two premieres tomorrow on MovieStream",
    time: "2 days ago",
    unread: false,
    icon: Calendar
  },
  {
    id: 4,
    type: "system",
    title: "Premium Features Unlocked",
    message: "Welcome to MovieStream Premium! Enjoy 4K streaming and offline downloads",
    time: "3 days ago",
    unread: false,
    icon: Star
  }
];

export const NotificationsDialog = ({ open, onOpenChange }: NotificationsDialogProps) => {
  const unreadCount = mockNotifications.filter(n => n.unread).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" className="text-xs">
              Mark all as read
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-1">
          {mockNotifications.map((notification, index) => {
            const IconComponent = notification.icon;
            
            return (
              <div key={notification.id}>
                <div className={`p-3 rounded-lg transition-colors hover:bg-muted/50 ${
                  notification.unread ? 'bg-muted/30' : ''
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      notification.unread ? 'bg-primary/20' : 'bg-muted'
                    }`}>
                      <IconComponent className={`w-4 h-4 ${
                        notification.unread ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`font-medium text-sm ${
                          notification.unread ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {notification.title}
                        </h4>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <span className="text-xs text-muted-foreground mt-2 block">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </div>
                
                {index < mockNotifications.length - 1 && (
                  <Separator className="my-1" />
                )}
              </div>
            );
          })}
        </div>
        
        {mockNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No notifications
            </h3>
            <p className="text-sm text-muted-foreground">
              We'll notify you when something important happens
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};