import index from "./index.html";
import type { ApiResponse, Character } from "./models";

interface BunServe {
  static: Record<string, string>;
}

const server = Bun.serve<BunServe>({
  static: {
    "/": index,
  },

  async fetch(req) {
    const path = new URL(req.url).pathname;

    if (path === "/api/characters") {
      const characters: Character[] = [
        { id: 1, name: "John Jorge", species: "Human" },
        { id: 2, name: "Jane Smith", species: "Alien" },
        { id: 3, name: "Sam Brown", species: "Robot" },
      ];

      const result: ApiResponse = {
        results: characters,
      };

      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`listening on http://${server.hostname}:${server.port}`);
