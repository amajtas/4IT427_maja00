import { createContext, useContext, useState, type ReactNode } from "react";
import type { Film } from "@/types/film.types";

// Zadefinujeme, čo všetko náš centrálny sklad poskytuje
interface WatchlistContextValue {
    films: Film[];
    addFilm: (film: Omit<Film, "id" | "watched">) => void;
    removeFilm: (id: string) => void;
    markAllAsWatched: () => void;
    toggleWatched: (id: string) => void;
}


// Vytvorenie Contextu
const WatchlistContext = createContext<WatchlistContextValue | null>(null);

const INITIAL_MOVIES: Film[] = [
    {
        id: "1",
        title: "Leví kráľ",
        year: 1994,
        genre: "Animovaný / Rodinný",
        rating: 9,
        watched: true,
    },
    {
        id: "2",
        title: "Ľadové kráľovstvo",
        year: 2013,
        genre: "Animovaný / Muzikál",
        rating: 8,
        watched: false,
    },
    {
        id: "3",
        title: "Mulan",
        year: 1998,
        genre: "Animovaný / Dobrodružný",
        rating: 8,
        watched: true,
    },
];

// Provider
export function WatchlistProvider({ children }: { children: ReactNode }) {
    const [films, setFilms] = useState<Film[]>(INITIAL_MOVIES);

    // Funkcia na pridanie filmu
    const addFilm = (newFilmData: Omit<Film, "id" | "watched">) => {
        const newFilm: Film = {
            ...newFilmData,
            id: crypto.randomUUID(),
            watched: false,
        };
        setFilms((prev) => [...prev, newFilm]);
    };

    // Funkcia na vymazanie filmu podľa ID
    const removeFilm = (id: string) => {
        setFilms((prev) => prev.filter((f) => f.id !== id));
    };

    // Funkcia na prepnutie stavu watched
    const toggleWatched = (id: string) => {
        setFilms((prev) =>
            prev.map((f) => (f.id === id ? { ...f, watched: !f.watched } : f))
        );
    };

    // Hromadná prepnutie stavu watched
    const markAllAsWatched = () => {
        setFilms((prev) => prev.map((f) => ({ ...f, watched: true })));
    };

    return (
        <WatchlistContext.Provider
            value={{ films, addFilm, removeFilm, toggleWatched, markAllAsWatched }}
        >
            {children}
        </WatchlistContext.Provider>
    );
}

// Vlastný hook, cez ktorý budú komponenty pristupovať do skladu
export function useWatchlist() {
    const context = useContext(WatchlistContext);
    // Ochrana: Ak sa niekto pokúsi použiť hook mimo nášho Providera, vyhodíme chybu
    if (!context) {
        throw new Error("useWatchlist musí byť použitý vo vnútri WatchlistProvider");
    }
    return context;
}