import { AddFilmForm } from "../components/AddFilmForm";

export function AddFilmPage() {
  return (
    <div>
      <h1>Pridanie nového filmu</h1>
      <p style={{ marginBottom: "2rem", opacity: 0.8 }}>
        Vyplňte formulár nižšie pre zaradenie filmu do vášho watchlistu.
      </p>

      <AddFilmForm />
    </div>
  );
}