import type { Metadata } from "next";
import { getAuthSession } from "@/auth";
import { Providers } from "@/components/auth/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Google Auth",
  description: "Base com login Google, home, login e dashboard autenticado.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuthSession();

  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
