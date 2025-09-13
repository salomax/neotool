export async function enableMocking() {
  if (typeof window === "undefined") return;
  if (process.env.NEXT_PUBLIC_MSW !== "1") return;
  const { worker } = await import("./browser");
  await worker.start({ onUnhandledRequest: "bypass" });
}
