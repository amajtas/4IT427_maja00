import { useState } from "react";
import { useWatchlist } from "../context/WatchlistContext"; // Náš hook pre prístup do skladu

export function AddFilmForm() {
  // Vytiahneme si funkciu addFilm priamo z Contextu
  const { addFilm } = useWatchlist();

  // Lokálny stav len pre tieto konkrétne políčka formulára
  const [title, setTitle] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState<number | "">("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ak niečo chýba, nič nepridáme
    if (!title || !year || !genre || !rating) return;

    // Pošleme nový film do nášho globálneho skladu (Contextu)
    addFilm({
      title,
      year: Number(year),
      genre,
      rating: Number(rating),
    });

    // Vyčistíme formulár, aby bol pripravený na ďalší film
    setTitle("");
    setYear("");
    setGenre("");
    setRating("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px" }}>
      <h3>Pridať nový film</h3>
      
      <div style={{ marginBottom: "10px" }}>
        <input type="text" placeholder="Názov filmu" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <input type="number" placeholder="Rok vydania" value={year} onChange={(e) => setYear(Number(e.target.value) || "")} required />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <input type="text" placeholder="Žáner" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <input type="number" placeholder="Hodnotenie (1-10)" min="1" max="10" value={rating} onChange={(e) => setRating(Number(e.target.value) || "")} required />
      </div>
      
      <button type="submit">
        Pridať do Watchlistu
      </button>
    </form>
  );
}