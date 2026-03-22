import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthSession, isAuthConfigured } from "@/auth";
import { TrainingShell } from "@/components/training/training-shell";

export const metadata: Metadata = {
  title: "Treinamento | Next.js Google Auth",
  description:
    "Rota de treinamento com modulos de Google Auth integrados ao visual da aplicacao.",
};

type TrainingPageProps = {
  searchParams?: Promise<{
    modulo?: string;
  }>;
};

export default async function TrainingPage({ searchParams }: TrainingPageProps) {
  if (!isAuthConfigured) {
    redirect("/login");
  }

  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/login");
  }

  const resolvedSearchParams = await searchParams;

  return <TrainingShell initialSectionId={resolvedSearchParams?.modulo} />;
}
