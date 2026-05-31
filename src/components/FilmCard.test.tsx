//Integracny test komponenty

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import FilmCard from "./FilmCard";

const mockFilm = {
    id: "test-id-123",
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    rating: 9,
    watched: false,
};

describe("FilmCard komponenta", () => {
    it("zobraz nazov a rok filmu", () => {
        render(<FilmCard {...mockFilm} onToggleWatched={() => { }} onRemove={() => { }} />);

        expect(screen.getByText("Interstellar")).toBeInTheDocument();
        expect(screen.getByText(/2014/i)).toBeInTheDocument();
    });

    it("nezobrazi badge Zhlednuto pokial je watched na false", () => {
        render(<FilmCard {...mockFilm} onToggleWatched={() => { }} onRemove={() => { }} />);
        expect(screen.queryByText(/✓ Zhlédnuto/i)).not.toBeInTheDocument();
    });

    it("zobrazi badge Zhlednuto pokial je watched nastavene na true", () => {
        render(<FilmCard {...mockFilm} watched={true} onToggleWatched={() => { }} onRemove={() => { }} />);
        expect(screen.getByText(/✓ Zhlédnuto/i)).toBeInTheDocument();
    });


    it("zavola callback onToggleWatched pri kliknuti na tlacidlo pre zmenu stavu", async () => {
        //Vytvorenie falosnej funkcie aby sme sledovali, ci na nu robot klikol
        const mockToggleWatched = vi.fn();
        // nastavenie pouzivatela
        const user = userEvent.setup();
        render(<FilmCard {...mockFilm} onToggleWatched={mockToggleWatched} onRemove={() => { }} />);
        // najdeme tlacidlo, ktore obsahuje text pre zmenu stavu a klikneme na neho
        const toggleButton = screen.getByRole("button", { name: /Změnit stav zhlédnutí/i });
        await user.click(toggleButton);
        //overenie ze bola funkcia zavolana a dostala ID ("test-id-123")
        expect(mockToggleWatched).toHaveBeenCalledTimes(1);
        expect(mockToggleWatched).toHaveBeenCalledWith("test-id-123");
    });


});