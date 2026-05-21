interface FilmCardProps {
    title: string;
    year: number;
    genre: string;
    rating: number;
    watched: boolean,
    onToggleWatched: (title: string) => void;
}

function FilmCard({ 
    title, 
    year, 
    genre, 
    rating, 
    watched, 
    onToggleWatched
}: FilmCardProps) {
  return (
    <div>
      <h2>{title}</h2>
      <p>Rok: {year}</p>
      <p>Zaner: {genre}</p>
      <p>Hodnotenie: {rating} /10</p>
      {watched && <p>✓ Zhlédnuto</p>}
      <button onClick={() => onToggleWatched(title)}>Změnit stav zhlédnutí
      </button>
    </div>
  );
}
 export default FilmCard;
