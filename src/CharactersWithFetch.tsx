import { useEffect, useState } from "react";
import type { ApiResponse, Character } from "../models";

const fetchCharacters = () =>
  fetch("/api/characters")
    .then((res) => res.json() as Promise<ApiResponse>)
    .then((response) => response.results);

function CharactersWithFetch() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetchCharacters().then(setCharacters);
  }, []);

  return (
    <ul>
      {characters.map((character) => (
        <li key={character.id}>{character.name}</li>
      ))}
    </ul>
  );
}

export default CharactersWithFetch;
