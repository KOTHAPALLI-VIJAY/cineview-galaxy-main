import { useState } from "react";
import { StreamingNav } from "@/components/StreamingNav";
import { MovieRow } from "@/components/MovieRow";
import { MovieDialog } from "@/components/MovieDialog";
import { Movie, mockMovies, mockTVShows } from "@/lib/tmdb";
import { useToast } from "@/hooks/use-toast";

const MyList = () => {
  const [selectedItem, setSelectedItem] = useState<Movie | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  // Mock user's saved items (first few movies and shows)
  const savedMovies = mockMovies.slice(0, 4);
  const savedShows = mockTVShows.slice(0, 3);
  const recentlyWatched = [...mockMovies.slice(1, 3), ...mockTVShows.slice(1, 2)];

  const handleItemClick = (item: Movie) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const allItems = [...savedMovies, ...savedShows, ...recentlyWatched];
      const results = allItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.overview.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      
      if (results.length === 0) {
        toast({
          title: "No results found",
          description: `No items found in your list for "${query}".`,
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error", 
        description: "Unable to search your list. Please try again.",
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
          <h1 className="text-4xl font-bold text-foreground mb-8">My List</h1>
          
          {searchResults.length > 0 && (
            <MovieRow
              title="Search Results"
              movies={searchResults}
              onMovieClick={handleItemClick}
            />
          )}
          
          {!isSearching && (
            <>
              {recentlyWatched.length > 0 && (
                <MovieRow
                  title="Continue Watching"
                  movies={recentlyWatched}
                  onMovieClick={handleItemClick}
                />
              )}
              
              {savedMovies.length > 0 && (
                <MovieRow
                  title="My Movies"
                  movies={savedMovies}
                  onMovieClick={handleItemClick}
                />
              )}
              
              {savedShows.length > 0 && (
                <MovieRow
                  title="My TV Shows"
                  movies={savedShows}
                  onMovieClick={handleItemClick}
                />
              )}
              
              {savedMovies.length === 0 && savedShows.length === 0 && (
                <div className="text-center py-20">
                  <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
                    Your list is empty
                  </h2>
                  <p className="text-muted-foreground">
                    Add movies and TV shows to see them here
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <MovieDialog
        movie={selectedItem}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      
      <div className="h-20" />
    </div>
  );
};

export default MyList;