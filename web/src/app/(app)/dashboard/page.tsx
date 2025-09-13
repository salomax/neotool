// Server Component
export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { delay?: string };
}) {
  const delayMs = Number(searchParams?.delay ?? 0);
  if (Number.isFinite(delayMs) && delayMs > 0) {
    await new Promise((r) => setTimeout(r, delayMs));
  }
  return (
    <div style={{ padding: 16 }}>
      <h1>Dashboard</h1>
      <p>Bem-vindo ao painel.</p>
    </div>
  );
}
