//Unit testy

import { describe, it, expect } from "vitest";
import { filterFilmsByTitle, calculateAverageRating } from "./filmUtils";
import type { Film } from "@/types/film.types";

//Testovacie data
const mockFilms: Film[] = [
    { id: "1", title: "Duna: Časť druhá", year: 2024, genre: "Sci-Fi", rating: 5, watched: true },
    { id: "2", title: "Oppenheimer", year: 2023, genre: "Životopisný", rating: 5, watched: false },
    { id: "3", title: "Joker", year: 2019, genre: "Dráma", rating: 5, watched: true },
]

describe("filterFilmsByTitle", () => {
    it("najde film podla casti nazvu", () => {
        //Act - Vykonanie
        const result = filterFilmsByTitle(mockFilms, "    OppeN  ");

        //Assert - Overenie
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe("Oppenheimer");
    });

    it("vrati vsetky filmy ak je hladany vyraz prazdny", () => {
        const result = filterFilmsByTitle(mockFilms, "    ");
        expect(result).toHaveLength(3);
    });
});

describe("calculateAverageRating", () => {
    it("spravne vypocitany priemer hodnoteni", () => {
        const result = calculateAverageRating(mockFilms);
        expect(result).toBeCloseTo(5);
    });

    it("vrati 0 ak je pole filmov prazdne", () => {
        const result = calculateAverageRating([]);
        expect(result).toBe(0);
    });
});