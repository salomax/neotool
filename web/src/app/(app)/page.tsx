import Link from "next/link";

export default function AppIndex() {
  return (
    <main style={{ padding: 24 }}>
      <h2>App</h2>
      <p>
        Try the <Link href="/dashboard">Dashboard</Link>.
      </p>
    </main>
  );
}
