"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { invalidatePage } from "./actions";

export default function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex gap-3">
      <button
        onClick={() => router.push(`/?seed=${Date.now()}`)}
        className="rounded-full bg-zinc-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        New Joke
      </button>
      <button
        onClick={() => startTransition(() => invalidatePage())}
        disabled={isPending}
        className="rounded-full border border-zinc-300 px-6 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        {isPending ? "Invalidating..." : "Invalidate Page"}
      </button>
    </div>
  );
}
