// Server Component — SEMPRE lança erro (rota exclusiva p/ E2E)
export default async function E2EErrorPage() {
  throw new Error("E2E error demo");
}
