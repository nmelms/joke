import { Suspense } from "react";
import RefreshButton from "./refresh-button";

interface Joke {
  type: "single" | "twopart";
  joke?: string;
  setup?: string;
  delivery?: string;
}

async function getJoke(url: string): Promise<Joke> {
  "use cache";
  const res = await fetch(url);
  return res.json();
}

async function JokeContent({
  searchParams,
}: {
  searchParams: Promise<{ seed?: string }>;
}) {
  const { seed = "init" } = await searchParams;
  const url = `https://v2.jokeapi.dev/joke/Any?safe-mode&cachebust=${seed}`;
  const joke = await getJoke(url);

  if (joke.type === "single") {
    return (
      <p className="text-center text-lg text-zinc-700 dark:text-zinc-300">
        {joke.joke}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3 text-center">
      <p className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
        {joke.setup}
      </p>
      <p className="text-lg text-zinc-500 dark:text-zinc-400 italic">
        {joke.delivery}
      </p>
    </div>
  );
}

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ seed?: string }>;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <main className="flex max-w-lg flex-col items-center gap-6 rounded-2xl bg-white p-10 shadow-md dark:bg-zinc-900">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Joke of the moment
        </h1>
        <Suspense
          fallback={
            <p className="text-center text-lg text-zinc-400 dark:text-zinc-500">
              Loading…
            </p>
          }
        >
          <JokeContent searchParams={searchParams} />
        </Suspense>
        <RefreshButton />
      </main>
    </div>
  );
}
