import type { Film } from "@/types/film.types";
import styles from "./FilmCard.module.css";

interface FilmCardProps extends Film {
  onToggleWatched: (id: string) => void;
  onRemove: (id: string) => void;
}

function FilmCard({
  id,
  title,
  year,
  genre,
  rating,
  watched,
  onToggleWatched,
  onRemove,
}: FilmCardProps) {
  const isRatingValid = rating >= 1 && rating <= 10;
  const cardClassName = watched ? `${styles.card} ${styles.watched}` : styles.card;
  return (
    <div className={cardClassName}>
      <h2 className={styles.title}>{title}</h2>
      <p>Rok: {year}</p>
      <p>Zaner: {genre}</p>
      {isRatingValid ? (
        <p className={styles.info}>Hodnotenie: {rating}/10</p>
      ) : (
        <p className={styles.info} style={{ color: "var(--danger-color)" }}>Neplatné hodnocení</p>
      )}
      {watched && <p>✓ Zhlédnuto</p>}
      <button className={styles.btnToggle} onClick={() => onToggleWatched(id)}>
        Změnit stav zhlédnutí
      </button>
      <button className={styles.btnRemove} onClick={() => onRemove(id)}>
        Odebrat
      </button>
    </div>
  );
}
export default FilmCard;
