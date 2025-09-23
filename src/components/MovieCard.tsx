import { Movie, getImageUrl } from "@/lib/tmdb";
import { Card } from "@/components/ui/card";
import { Play, Star } from "lucide-react";
import { useState } from "react";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Card 
      className="group relative bg-netflix-card border-0 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 shadow-movie animate-fade-in"
      onClick={onClick}
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={imageError ? "/placeholder.svg" : getImageUrl(movie.poster_path)}
          alt={movie.title}
          className={`w-full h-full object-cover transition-all duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-110`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
        
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
          <div className="bg-primary/90 rounded-full p-3 shadow-hero">
            <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </div>
        
        {/* Rating */}
        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-xs font-medium">{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
      
      {/* Movie info */}
      <div className="p-3">
        <h3 className="font-semibold text-sm text-foreground line-clamp-1 mb-1">
          {movie.title}
        </h3>
        <p className="text-xs text-muted-foreground">
          {new Date(movie.release_date).getFullYear()}
        </p>
      </div>
    </Card>
  );
};