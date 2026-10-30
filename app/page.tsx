import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-2 px-4 py-8">
      <h1 className="text-heading-section">Gurises Unidos</h1>
      <p className="text-body-sm text-text-muted">
        El dashboard se arma en los próximos slices. Mientras tanto, los tokens
        del sistema están en{" "}
        <Link
          href="/tokens"
          className="text-action-secondary-text underline underline-offset-2"
        >
          /tokens
        </Link>
        .
      </p>
    </main>
  );
}
