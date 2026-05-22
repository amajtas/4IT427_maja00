/* Stylingová metoda: CSS Modules */
import styles from "./App.module.css";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import { WatchlistPage } from "./pages/WatchlistPage";
import { AddFilmPage } from "./pages/AddFilmPage";

function App() {

  // Funkcia pre bonusový Dark Mode
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            // Funkcia pre aktívny odkaz: ak sme na danej stránke, pridá sa trieda 'active'
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Můj watchlist
          </NavLink>
          <NavLink
            to="/form"
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Přidat film
          </NavLink>
        </nav>
        <button className={styles.btnSecondary} onClick={toggleDarkMode}>
          🌙 Tmavý režim
        </button>
      </header>

      <Routes>
        {/* Na hlavnej adrese / ukážeme zoznam filmov */}
        <Route path="/" element={<WatchlistPage />} />

        {/* Na adrese /form ukážeme formulár */}
        <Route path="/form" element={<AddFilmPage />} />

        {/* Fallback routa podľa zadania: ak používateľ zadá nezmysel, 
            komponenta <Navigate> ho automaticky presmeruje späť na hlavnú stránku */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

export default App;