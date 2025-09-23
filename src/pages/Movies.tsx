import { useState, useEffect } from "react";
import { StreamingNav } from "@/components/StreamingNav";
import { MovieRow } from "@/components/MovieRow";
import { MovieDialog } from "@/components/MovieDialog";
import { Movie, mockMovies } from "@/lib/tmdb";
import { useToast } from "@/hooks/use-toast";

const Movies = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setDialogOpen(true);
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const results = mockMovies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.overview.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      
      if (results.length === 0) {
        toast({
          title: "No results found",
          description: `No movies found for "${query}".`,
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

  return (
    <div className="min-h-screen bg-background">
      <StreamingNav onSearch={handleSearch} />
      
      <div className="pt-24 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Movies</h1>
          
          {searchResults.length > 0 && (
            <MovieRow
              title="Search Results"
              movies={searchResults}
              onMovieClick={handleMovieClick}
            />
          )}
          
          {!isSearching && (
            <>
              <MovieRow
                title="Popular Movies"
                movies={mockMovies}
                onMovieClick={handleMovieClick}
              />
              
              <MovieRow
                title="Top Rated Movies"
                movies={[...mockMovies].reverse()}
                onMovieClick={handleMovieClick}
              />
              
              <MovieRow
                title="Action Movies"
                movies={mockMovies.slice(0, 6)}
                onMovieClick={handleMovieClick}
              />
              
              <MovieRow
                title="Comedy Movies"
                movies={mockMovies.slice(2, 8)}
                onMovieClick={handleMovieClick}
              />
            </>
          )}
        </div>
      </div>
      
      <MovieDialog
        movie={selectedMovie}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      
      <div className="h-20" />
    </div>
  );
};

export default Movies;