# Bun-Node-Killer

Welcome to the Bun-Node-Killer project.
This project aims to demonstrate how to use Bun as a static
page server, create a server for APIs, and use React 19 with Server Components.

Let's go through the steps.

## Requirements

First, make sure you have Bun installed. You can check the version with:

```bash
bun --version
```

For this project, we are using version 1.2.3 (canary for now).

```bash
bun upgrade --canary
```

## Serving Static Pages with Bun

To serve a static file with Bun, simply run:

```bash
bun index.html
```

## More Complex Configuration with Bun

If you want to use TailwindCSS in your HTML routes, follow these steps:

1. Initialize your project with Bun:

```bash
bun init
name: whatever you want
entry point: src/tsx
```

2. Add the necessary plugins:

```bash
bun add -D bun-plugin-tailwind
```

3. Create a `bunfig.toml` file and add the configuration:

```toml
[serve.static]
plugins = ["bun-plugin-tailwind"]
```

## Adding React or Other Libraries

To add React and other libraries, run:

```bash
bun add react react-dom @types/react-dom
```

Then, add an `index.tsx` and a `root` element in your `index.html`:

```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/index.tsx"></script>
</body>
```

Bootstrap React in `index.tsx`:

```typescript
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div>
      <h1>Gentleman Programming running from React</h1>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
```

## Creating a Server with Bun

To create a server, add a `server.ts` file:

```typescript
import index from "./index.html";

interface BunServe {
  static: Record<string, string>;
}

const server = Bun.serve<BunServe>({
  static: {
    "/": index,
  },

  // we need to add this one for type safety, we will implement it later
  async fetch(_req) {
    return new Response("hi ! I'm Gentleman");
  },
});

console.log(`Listening on http://${server.hostname}:${server.port}`);
```

Run it with:

```bash
bun server.ts
```

## Bun as a Server that Provides an API

Let's modify the previous async fetch to add an API:

```typescript
import index from "./index.html";

interface BunServe {
  static: Record<string, string>;
}

export interface Character {
  id: number;
  name: string;
  species: string;
  image: string;
}

export interface ApiResponse {
  results: Character[];
}

const server = Bun.serve<BunServe>({
  static: {
    "/": index,
  },

  async fetch(req) {
    const path = new URL(req.url).pathname;
    if (path === "/api/characters") {
      const characters: Character[] = [
        { id: 1, name: "Harry Potter", species: "Human", image: "harry.jpg" },
        {
          id: 2,
          name: "Hermione Granger",
          species: "Human",
          image: "hermione.jpg",
        },
        { id: 3, name: "Ron Weasley", species: "Human", image: "ron.jpg" },
        {
          id: 4,
          name: "Albus Dumbledore",
          species: "Human",
          image: "dumbledore.jpg",
        },
        { id: 5, name: "Severus Snape", species: "Human", image: "snape.jpg" },
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

console.log(`Listening on http://${server.hostname}:${server.port}`);
```

And that's it, folks. With this, you have a solid foundation to start
working with Bun, React, and APIs.

Any questions, you know where to find me. Let's get coding!
