import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Film } from "@/types/film.types";
import { useQuery } from "@tanstack/react-query";

// Zadefinujeme, čo všetko náš centrálny sklad poskytuje
interface WatchlistContextValue {
    films: Film[];
    addFilm: (film: Omit<Film, "id" | "watched">) => void;
    removeFilm: (id: string) => void;
    markAllAsWatched: () => void;
    toggleWatched: (id: string) => void;
    isLoading: boolean;
    error: Error | null;
}


// Vytvorenie Contextu
const WatchlistContext = createContext<WatchlistContextValue | null>(null);


// Provider
export function WatchlistProvider({ children }: { children: ReactNode }) {
    const [films, setFilms] = useState<Film[]>([]);

    //Stiahnutie dat z naseho simulovaneho API
    const { data, isLoading, error } = useQuery<Film[], Error>({
        queryKey: ["films"],
        queryFn: async () => {
            const response = await fetch("/films.json");
            if (!response.ok) {
                throw new Error("Nepodarilo sa načítať súboru z JSON")

            }
            return response.json();
        }
    });

    useEffect(() => {
        if (data && films.length===0) {
            setFilms(data);
        }
    }, [data]);

    // Funkcia na pridanie filmu
    const addFilm = (newFilmData: Omit<Film, "id" | "watched">) => {
        const newFilm: Film = {
            ...newFilmData,
            id: Date.now().toString(),
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
            value={{ films, addFilm, removeFilm, toggleWatched, markAllAsWatched, isLoading, error }}
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