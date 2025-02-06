import { createRoot } from "react-dom/client";
// import CharactersWithFetch from "./CharactersWithFetch";
import CharactersWithUse from "./CharactersWithUse";

function App() {
  return (
    <div>
      <h1 className="text-pink-500">
        Gentleman Programming running from React
      </h1>
      {/* <CharactersWithFetch /> */}
      <CharactersWithUse />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
