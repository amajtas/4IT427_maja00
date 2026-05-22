import type { Film } from "@/types/film.types";

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
  return (
    <div className="card" style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      <h2>{title}</h2>
      <p>Rok: {year}</p>
      <p>Zaner: {genre}</p>
      {isRatingValid ? <p>Hodnotenie: {rating}/10</p> : <p style={{ color: "red" }}>Neplatné hodnocení</p>}
      {watched && <p>✓ Zhlédnuto</p>}
      <button onClick={() => onToggleWatched(id)}>
        Změnit stav zhlédnutí
      </button>
      <button onClick={() => onRemove(id)}>
        Odebrat
      </button>
    </div>
  );
}
export default FilmCard;
