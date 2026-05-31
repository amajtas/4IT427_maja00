import type { Film } from "@/types/film.types";

//Filtrovanie podla nazvu
export function filterFilmsByTitle(films: Film[], searchTitle: string): Film[] {
    const cleanSearch = searchTitle.trim().toLowerCase();
    if (!cleanSearch) return films;

    return films.filter((film) =>
        film.title.toLowerCase().includes(cleanSearch)
    );
}

//Vypocet priemerneho hodnotenia, ak je pole pr8zdne vrati 0

export function calculateAverageRating(films: Film[]): number {
    if (films.length === 0) return 0;

    const totalRating = films.reduce((sum, film) => sum + film.rating, 0);
    return totalRating / films.length;
}