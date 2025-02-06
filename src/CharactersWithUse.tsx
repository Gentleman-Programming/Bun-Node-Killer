import { cache, Suspense, use } from "react";
import type { ApiResponse, Character } from "../models";

// server component
const fetchCharacters = cache(() =>
  fetch("/api/characters")
    .then((res) => res.json() as Promise<ApiResponse>)
    .then((response) => response.results),
);

function Characters({
  charactersPromise,
}: {
  charactersPromise: Promise<Character[]>;
}) {
  const characters = use(charactersPromise);

  return (
    <ul>
      {characters.map((character) => (
        <li key={character.id}>{character.name}</li>
      ))}
    </ul>
  );
}

function CharactersWithUse() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Characters charactersPromise={fetchCharacters()} />
    </Suspense>
  );
}

export default CharactersWithUse;
