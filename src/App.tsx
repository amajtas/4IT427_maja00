/* Stylingová metoda: CSS Modules */

import FilmCard from "./components/FilmCard";
import { useWatchlist } from "./context/WatchlistContext";
import { AddFilmForm } from "./components/AddFilmForm";
import styles from "./App.module.css";

function App() {

  const { films, toggleWatched, removeFilm, markAllAsWatched } = useWatchlist();
  // 2. Výpočet pre štatistiku v záhlaví
  const total = films.length;
  const watchedCount = films.filter((f) => f.watched).length;

  // Funkcia pre bonusový Dark Mode
  const toggleDarkMode = () => {
    // "document.documentElement" je vlastne značka <html>
    // classList.toggle("dark") pridá/odoberie triedu "dark", čo aktivuje naše CSS premenné z index.css
    document.documentElement.classList.toggle("dark");
  };
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Watchlist ({watchedCount} / {total} zhlédnuto)</h1>
        <button className={styles.btnSecondary} onClick={toggleDarkMode}>
          🌙 Tmavý režim
        </button>
      </header>
      <AddFilmForm />

      <div className={styles.controls}>
        <button className={styles.btnSecondary} onClick={markAllAsWatched}>
          ✓ Označit vše jako zhlédnuté
        </button>
      </div>

      {/*Vykreslenie zoznamu filmov*/}
      <div className={styles.grid}>
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