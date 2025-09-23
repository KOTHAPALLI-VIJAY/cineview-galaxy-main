// TMDB API configuration and utilities
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// You'll need to add your TMDB API key here
const TMDB_API_KEY = 'your_api_key_here'; // Replace with actual API key

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

class TMDBApi {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async fetchFromTMDB(endpoint: string): Promise<any> {
    const url = `${TMDB_BASE_URL}${endpoint}?api_key=${this.apiKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.statusText}`);
    }
    
    return response.json();
  }

  async getPopularMovies(page: number = 1): Promise<MovieResponse> {
    return this.fetchFromTMDB(`/movie/popular&page=${page}`);
  }

  async getTopRatedMovies(page: number = 1): Promise<MovieResponse> {
    return this.fetchFromTMDB(`/movie/top_rated&page=${page}`);
  }

  async getNowPlayingMovies(page: number = 1): Promise<MovieResponse> {
    return this.fetchFromTMDB(`/movie/now_playing&page=${page}`);
  }

  async getUpcomingMovies(page: number = 1): Promise<MovieResponse> {
    return this.fetchFromTMDB(`/movie/upcoming&page=${page}`);
  }

  async searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
    return this.fetchFromTMDB(`/search/movie&query=${encodeURIComponent(query)}&page=${page}`);
  }

  async getMovieDetails(movieId: number): Promise<Movie> {
    return this.fetchFromTMDB(`/movie/${movieId}`);
  }

  async getGenres(): Promise<{ genres: Genre[] }> {
    return this.fetchFromTMDB('/genre/movie/list');
  }
}

// Image URL helpers
export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder.svg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null, size: string = 'w1280'): string => {
  if (!path) return '/placeholder.svg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

// Create and export the API instance
export const tmdbApi = new TMDBApi(TMDB_API_KEY);

// Mock data for demo purposes (remove when API key is added)
export const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Dark Knight",
    overview: "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    release_date: "2008-07-18",
    vote_average: 9.0,
    vote_count: 28000,
    genre_ids: [28, 18, 80],
    adult: false,
    original_language: "en",
    original_title: "The Dark Knight",
    popularity: 98.5,
    video: false
  },
  {
    id: 2,
    title: "Inception",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology.",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    release_date: "2010-07-16",
    vote_average: 8.8,
    vote_count: 31000,
    genre_ids: [28, 878, 53],
    adult: false,
    original_language: "en",
    original_title: "Inception",
    popularity: 95.2,
    video: false
  },
  {
    id: 3,
    title: "Avengers: Endgame",
    overview: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions.",
    poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop_path: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    release_date: "2019-04-26",
    vote_average: 8.7,
    vote_count: 22000,
    genre_ids: [28, 12, 878],
    adult: false,
    original_language: "en",
    original_title: "Avengers: Endgame",
    popularity: 96.8,
    video: false
  },
  {
    id: 4,
    title: "The Matrix",
    overview: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdrop_path: "/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
    release_date: "1999-03-31",
    vote_average: 8.6,
    vote_count: 24000,
    genre_ids: [28, 878],
    adult: false,
    original_language: "en",
    original_title: "The Matrix",
    popularity: 87.3,
    video: false
  },
  {
    id: 5,
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    release_date: "1994-10-14",
    vote_average: 8.9,
    vote_count: 26000,
    genre_ids: [80, 18],
    adult: false,
    original_language: "en",
    original_title: "Pulp Fiction",
    popularity: 92.1,
    video: false
  },
  {
    id: 6,
    title: "Interstellar",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg",
    release_date: "2014-11-07",
    vote_average: 8.5,
    vote_count: 27000,
    genre_ids: [12, 18, 878],
    adult: false,
    original_language: "en",
    original_title: "Interstellar",
    popularity: 89.4,
    video: false
  },
  {
    id: 7,
    title: "The Godfather",
    overview: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    release_date: "1972-03-24",
    vote_average: 9.2,
    vote_count: 19000,
    genre_ids: [18, 80],
    adult: false,
    original_language: "en",
    original_title: "The Godfather",
    popularity: 85.7,
    video: false
  },
  {
    id: 8,
    title: "Spider-Man: No Way Home",
    overview: "Spider-Man's identity is revealed and he asks Doctor Strange for help, but things go wrong.",
    poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    backdrop_path: "/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
    release_date: "2021-12-17",
    vote_average: 8.4,
    vote_count: 21000,
    genre_ids: [28, 12, 878],
    adult: false,
    original_language: "en",
    original_title: "Spider-Man: No Way Home",
    popularity: 94.6,
    video: false
  }
];

// Mock TV Shows data
export const mockTVShows: Movie[] = [
  {
    id: 101,
    title: "Stranger Things",
    overview: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
    poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    backdrop_path: "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    release_date: "2016-07-15",
    vote_average: 8.7,
    vote_count: 15000,
    genre_ids: [18, 14, 27],
    adult: false,
    original_language: "en",
    original_title: "Stranger Things",
    popularity: 97.2,
    video: false
  },
  {
    id: 102,
    title: "The Crown",
    overview: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    poster_path: "/1M876KPjulVwppEpldhdc8V4o68.jpg",
    backdrop_path: "/wHa6KOJAoNTFLFtp7wguUJKSnju.jpg",
    release_date: "2016-11-04",
    vote_average: 8.3,
    vote_count: 8000,
    genre_ids: [18, 36],
    adult: false,
    original_language: "en",
    original_title: "The Crown",
    popularity: 89.5,
    video: false
  },
  {
    id: 103,
    title: "Breaking Bad",
    overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.",
    poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    backdrop_path: "/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    release_date: "2008-01-20",
    vote_average: 9.4,
    vote_count: 12000,
    genre_ids: [18, 80],
    adult: false,
    original_language: "en",
    original_title: "Breaking Bad",
    popularity: 92.8,
    video: false
  },
  {
    id: 104,
    title: "The Witcher",
    overview: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    poster_path: "/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg",
    backdrop_path: "/7HrvdJHAzVlKpVgkKFAozbpI79.jpg",
    release_date: "2019-12-20",
    vote_average: 8.1,
    vote_count: 9500,
    genre_ids: [18, 14, 12],
    adult: false,
    original_language: "en",
    original_title: "The Witcher",
    popularity: 88.3,
    video: false
  },
  {
    id: 105,
    title: "Game of Thrones",
    overview: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    poster_path: "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
    backdrop_path: "/suopoADq0k8YZr4dQXcU6pToj6s.jpg",
    release_date: "2011-04-17",
    vote_average: 9.0,
    vote_count: 14000,
    genre_ids: [18, 14, 12],
    adult: false,
    original_language: "en",
    original_title: "Game of Thrones",
    popularity: 95.7,
    video: false
  },
  {
    id: 106,
    title: "The Office",
    overview: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
    poster_path: "/7DJKHzAi83FmQFpQ4acDRrTf9Tv.jpg",
    backdrop_path: "/cDSr7RQTJ7dVfkj4VbVoIwQ9fDh.jpg",
    release_date: "2005-03-24",
    vote_average: 8.8,
    vote_count: 11000,
    genre_ids: [35],
    adult: false,
    original_language: "en",
    original_title: "The Office",
    popularity: 86.2,
    video: false
  },
  {
    id: 107,
    title: "Wednesday",
    overview: "Wednesday Addams is sent to Nevermore Academy, a supernatural boarding school where she attempts to master her psychic powers.",
    poster_path: "/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    backdrop_path: "/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg",
    release_date: "2022-11-23",
    vote_average: 8.6,
    vote_count: 7500,
    genre_ids: [35, 80, 14],
    adult: false,
    original_language: "en",
    original_title: "Wednesday",
    popularity: 93.1,
    video: false
  },
  {
    id: 108,
    title: "House of the Dragon",
    overview: "The Targaryen civil war begins 200 years before the events of Game of Thrones.",
    poster_path: "/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
    backdrop_path: "/t9XkeE7HzOsdQcDDDapDYh8Rrmt.jpg",
    release_date: "2022-08-21",
    vote_average: 8.2,
    vote_count: 6800,
    genre_ids: [18, 14, 12],
    adult: false,
    original_language: "en",
    original_title: "House of the Dragon",
    popularity: 91.4,
    video: false
  }
];