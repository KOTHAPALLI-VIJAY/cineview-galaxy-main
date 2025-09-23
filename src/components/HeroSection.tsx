import { Movie, getBackdropUrl } from "@/lib/tmdb";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";

interface HeroSectionProps {
  movie: Movie;
  onPlayClick?: () => void;
  onInfoClick?: () => void;
}

export const HeroSection = ({ movie, onPlayClick, onInfoClick }: HeroSectionProps) => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${getBackdropUrl(movie.backdrop_path, 'original')})`,
        }}
      />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="max-w-2xl animate-slide-up">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-tight">
              {movie.title}
            </h1>
            
            {/* Overview */}
            <p className="text-lg md:text-xl text-foreground/90 mb-8 leading-relaxed line-clamp-3">
              {movie.overview}
            </p>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold transition-smooth"
                onClick={onPlayClick}
              >
                <Play className="w-6 h-6 mr-3" fill="currentColor" />
                Play
              </Button>
              
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-muted/80 hover:bg-muted text-foreground px-8 py-3 text-lg font-semibold backdrop-blur-sm transition-smooth"
                onClick={onInfoClick}
              >
                <Info className="w-6 h-6 mr-3" />
                More Info
              </Button>
            </div>
            
            {/* Movie details */}
            <div className="flex items-center gap-4 mt-6 text-sm text-foreground/70">
              <span className="bg-primary px-2 py-1 rounded text-primary-foreground font-medium">
                {movie.vote_average.toFixed(1)} ★
              </span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span className="hidden sm:inline">
                {movie.original_language.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};