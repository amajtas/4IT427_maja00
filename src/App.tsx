import FilmCard from "./components/FilmCard";
import { useWatchlist } from "./hooks/useWatchlist";
import type { Film } from "./types/film.types";
const INITIAL_MOVIES: Film[] = [
  {
    title: "Leví kráľ",
    year: 1994,
    genre: "Animovaný / Rodinný",
    rating: 9,
    watched: true,
  },
  {
    title: "Ľadové kráľovstvo",
    year: 2013,
    genre: "Animovaný / Muzikál",
    rating: 8,
    watched: false,
  },
  {
    title: "Mulan",
    year: 1998,
    genre: "Animovaný / Dobrodružný",
    rating: 8,
    watched: true,
  },
];

function App() {
  const { films, toggleWatched, markAllAsWatched } = useWatchlist(INITIAL_MOVIES);;
  return (
    <main>
      <h1>Film Watchlist</h1>
      <button
        onClick={markAllAsWatched}
      >
        Označit vše jako zhlédnuté
      </button>
      {films.map((film) => (
        <FilmCard
          key={film.title}
          title={film.title}
          year={film.year}
          genre={film.genre}
          rating={film.rating}
          watched={film.watched}
          onToggleWatched={toggleWatched}
        />
      ))}
    </main>
  );
}

export default App;