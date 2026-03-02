export const revalidate = 5;

interface Joke {
  type: "single" | "twopart";
  joke?: string;
  setup?: string;
  delivery?: string;
}

async function getJoke(): Promise<Joke> {
  const res = await fetch("https://v2.jokeapi.dev/joke/Any?safe-mode", {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function Home() {
  const joke = await getJoke();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <main className="flex max-w-lg flex-col items-center gap-6 rounded-2xl bg-white p-10 shadow-md dark:bg-zinc-900">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Joke of the moment
        </h1>
        {joke.type === "single" ? (
          <p className="text-center text-lg text-zinc-700 dark:text-zinc-300">
            {joke.joke}
          </p>
        ) : (
          <div className="flex flex-col gap-3 text-center">
            <p className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
              {joke.setup}
            </p>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 italic">
              {joke.delivery}
            </p>
          </div>
        )}
        <p className="text-xs text-zinc-400 dark:text-zinc-600">
          Refreshes every 30 seconds
        </p>
      </main>
    </div>
  );
}
