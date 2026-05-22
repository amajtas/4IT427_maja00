import FilmCard from "./components/FilmCard";
import { useWatchlist } from "./context/WatchlistContext";
import { AddFilmForm } from "./components/AddFilmForm";


function App() {

  const { films, toggleWatched, removeFilm, markAllAsWatched } = useWatchlist();
  // 2. Výpočet pre štatistiku v záhlaví
  const total = films.length;
  const watchedCount = films.filter((f) => f.watched).length;

  return (
    <main>
      <h1>Watchlist ({watchedCount} / {total} zhlédnuto)</h1>
      
      <AddFilmForm />

      <button onClick={markAllAsWatched}>
        Označit vše jako zhlédnuté
      </button>

      {/*Vykreslenie zoznamu filmov*/}
      <div>
        {films.map((film) => (
          <FilmCard
            key={film.id}
            id={film.id}
            title={film.title}
            year={film.year}
            genre={film.genre}
            rating={film.rating}
            watched={film.watched}
            onToggleWatched={toggleWatched}
            onRemove={removeFilm}
          />
        ))}
      </div>
    </main>
  );
}

export default App;