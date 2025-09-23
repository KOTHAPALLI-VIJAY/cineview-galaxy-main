import { useState } from "react";
import { StreamingNav } from "@/components/StreamingNav";
import { MovieRow } from "@/components/MovieRow";
import { MovieDialog } from "@/components/MovieDialog";
import { Movie, mockTVShows } from "@/lib/tmdb";
import { useToast } from "@/hooks/use-toast";

const TVShows = () => {
  const [selectedShow, setSelectedShow] = useState<Movie | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleShowClick = (show: Movie) => {
    setSelectedShow(show);
    setDialogOpen(true);
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const results = mockTVShows.filter(show => 
        show.title.toLowerCase().includes(query.toLowerCase()) ||
        show.overview.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      
      if (results.length === 0) {
        toast({
          title: "No results found",
          description: `No TV shows found for "${query}".`,
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error", 
        description: "Unable to search TV shows. Please try again.",
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
          <h1 className="text-4xl font-bold text-foreground mb-8">TV Shows</h1>
          
          {searchResults.length > 0 && (
            <MovieRow
              title="Search Results"
              movies={searchResults}
              onMovieClick={handleShowClick}
            />
          )}
          
          {!isSearching && (
            <>
              <MovieRow
                title="Popular TV Shows"
                movies={mockTVShows}
                onMovieClick={handleShowClick}
              />
              
              <MovieRow
                title="Top Rated Series"
                movies={[...mockTVShows].reverse()}
                onMovieClick={handleShowClick}
              />
              
              <MovieRow
                title="Drama Series"
                movies={mockTVShows.slice(0, 6)}
                onMovieClick={handleShowClick}
              />
              
              <MovieRow
                title="Comedy Series"
                movies={mockTVShows.slice(2, 8)}
                onMovieClick={handleShowClick}
              />
            </>
          )}
        </div>
      </div>
      
      <MovieDialog
        movie={selectedShow}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      
      <div className="h-20" />
    </div>
  );
};

export default TVShows;