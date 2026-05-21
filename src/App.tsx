import FilmCard from "./components/FilmCard";
const films = [
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
  const handleToggleWatched = (title: string) => {
    console.log(`Kliknuto na film: ${title}`);
  };
  return (
    <main>
      <h1>Film Watchlist</h1>
      {films.map((film) => (
        <FilmCard
          title={film.title}
          year={film.year}
          genre={film.genre}
          rating={film.rating}
          watched={film.watched}
          onToggleWatched={handleToggleWatched}
        />
      ))}
    </main>
  );
}

export default App;