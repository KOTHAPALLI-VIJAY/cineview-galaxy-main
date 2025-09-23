import { useState, useEffect } from "react";
import { StreamingNav } from "@/components/StreamingNav";
import { HeroSection } from "@/components/HeroSection";
import { MovieRow } from "@/components/MovieRow";
import { MovieDialog } from "@/components/MovieDialog";
import { Movie, mockMovies } from "@/lib/tmdb";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  // Set hero movie on component mount
  useEffect(() => {
    if (mockMovies.length > 0) {
      setHeroMovie(mockMovies[0]);
    }
  }, []);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setDialogOpen(true);
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    try {
      // For demo purposes, filter mock movies
      const results = mockMovies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.overview.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      
      if (results.length === 0) {
        toast({
          title: "No results found",
          description: `No movies found for "${query}". Try adding your TMDB API key for full search functionality.`,
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error", 
        description: "Unable to search movies. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handlePlayClick = () => {
    toast({
      title: "Play Movie",
      description: "Movie playback would start here. Connect to a video streaming service to enable playback.",
    });
  };

  const handleInfoClick = () => {
    if (heroMovie) {
      handleMovieClick(heroMovie);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <StreamingNav onSearch={handleSearch} />
      
      {/* Hero Section */}
      {heroMovie && (
        <HeroSection 
          movie={heroMovie}
          onPlayClick={handlePlayClick}
          onInfoClick={handleInfoClick}
        />
      )}
      
      {/* Content Section */}
      <div className="relative -mt-32 z-20">
        {/* Search Results */}
        {searchResults.length > 0 && (
          <MovieRow
            title="Search Results"
            movies={searchResults}
            onMovieClick={handleMovieClick}
          />
        )}
        
        {/* Movie Rows */}
        {!isSearching && (
          <>
            <MovieRow
              title="Popular Movies"
              movies={mockMovies}
              onMovieClick={handleMovieClick}
            />
            
            <MovieRow
              title="Top Rated"
              movies={[...mockMovies].reverse()}
              onMovieClick={handleMovieClick}
            />
            
            <MovieRow
              title="Now Playing"
              movies={mockMovies}
              onMovieClick={handleMovieClick}
            />
          </>
        )}
      </div>
      
      {/* Movie Detail Dialog */}
      <MovieDialog
        movie={selectedMovie}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      
      {/* Footer spacing */}
      <div className="h-20" />
    </div>
  );
};

export default Index;
