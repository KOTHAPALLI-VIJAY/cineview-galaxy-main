import { Movie, getBackdropUrl, getImageUrl } from "@/lib/tmdb";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Plus, ThumbsUp, Star, Calendar, Clock } from "lucide-react";

interface MovieDialogProps {
  movie: Movie | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MovieDialog = ({ movie, open, onOpenChange }: MovieDialogProps) => {
  if (!movie) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 bg-netflix-card border-0 overflow-hidden">
        {/* Hero section */}
        <div className="relative h-80 overflow-hidden">
          <img
            src={getBackdropUrl(movie.backdrop_path, 'w1280')}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-card via-netflix-card/40 to-transparent" />
          
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-background/20 hover:bg-background/40 text-foreground"
            onClick={() => onOpenChange(false)}
          >
            ×
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-6 -mt-20 relative z-10">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={getImageUrl(movie.poster_path, 'w300')}
                alt={movie.title}
                className="w-40 h-60 object-cover rounded-lg shadow-movie"
              />
            </div>
            
            {/* Movie details */}
            <div className="flex-1">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-foreground mb-4">
                  {movie.title}
                </DialogTitle>
              </DialogHeader>
              
              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Play className="w-5 h-5 mr-2" fill="currentColor" />
                  Play
                </Button>
                <Button variant="outline" size="lg" className="border-muted">
                  <Plus className="w-5 h-5 mr-2" />
                  My List
                </Button>
                <Button variant="outline" size="lg" className="border-muted">
                  <ThumbsUp className="w-5 h-5 mr-2" />
                  Like
                </Button>
              </div>
              
              {/* Movie info */}
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-foreground font-medium">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span>({movie.vote_count.toLocaleString()} votes)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{movie.original_language.toUpperCase()}</span>
                </div>
              </div>
              
              {/* Overview */}
              <p className="text-foreground/90 leading-relaxed mb-6">
                {movie.overview}
              </p>
              
              {/* Additional info */}
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Original Title: </span>
                  <span className="text-foreground">{movie.original_title}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Popularity: </span>
                  <span className="text-foreground">{movie.popularity.toFixed(1)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Adult: </span>
                  <span className="text-foreground">{movie.adult ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};