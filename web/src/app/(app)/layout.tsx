import MSWProvider from "../_components/MSWProvider";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AppShellClient from "../_components/AppShellClient";
import { NAV } from "@/config/nav.config";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const isAuthed = cookies().get("auth")?.value === "1";
  if (!isAuthed) redirect("/sign-in");
  return (
    <>
      <MSWProvider />
      <AppShellClient navItems={NAV}>{children}</AppShellClient>
    </>
  );
}
