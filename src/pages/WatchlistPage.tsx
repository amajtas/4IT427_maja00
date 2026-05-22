import FilmCard from "../components/FilmCard";
import { useWatchlist } from "../context/WatchlistContext";
import styles from "../App.module.css";


export function WatchlistPage() {
  const { films, toggleWatched, removeFilm, markAllAsWatched, isLoading, error } = useWatchlist();

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", fontSize: "1.2rem", color: "var(--primary-color)" }}>
        Načítavam filmy...
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", color: "var(--danger-color)" }}>
        <h2>Nastala chyba!</h2>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()} className={styles.btnSecondary} style={{ marginTop: "1rem" }}>
          Skúsiť znova
        </button>
      </div>
    );
  }

  // 2. Výpočet pre štatistiku v záhlaví
  const total = films.length;
  const watchedCount = films.filter((f) => f.watched).length;

  return (
    <div>
      <header className={styles.header}>
        <h1>Watchlist ({watchedCount} / {total} zhlédnuto)</h1>
      </header>
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
    </div>
  );
}