import { useState, useEffect } from "react";
import type { Film } from "@/types/film.types";


export function useWatchlist(initialFilms: Film[]) {
    const [films, setFilms] = useState<Film[]>(initialFilms);
    // Funkcia na prepnutie stavu "watched" pre konkrétny film
    const toggleWatched = (title: string) => {
        setFilms((prevFilms) =>
            prevFilms.map((film) =>
                film.title === title ? {
                    ...film, watched: !film.watched
                } : film
            )
        );
    }

    // Funkcia pre hromadnú akciu
    const markAllAsWatched = () => {
        setFilms((prevFilms) =>
            prevFilms.map((film) => ({ ...film, watched: true }))
        );
    };

    useEffect(() => {
        const watchedCount = films.filter((film) => film.watched).length;
        const totalCount = films.length;

        //Zmenime titulok v prehliadaci
        document.title = 'Watchlist (${watchedCount} / ${totalCount} zhlednuto';

    }, [films]);

    return { films, toggleWatched, markAllAsWatched };


}