import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthSession, isAuthConfigured } from "@/auth";
import { PythonDjangoShell } from "@/components/training/python-django-shell";

export const metadata: Metadata = {
  title: "Python Django | Treinamento",
  description:
    "Trilha protegida de Python Django integrada ao dashboard de modulos.",
};

type PythonDjangoPageProps = {
  searchParams?: Promise<{
    modulo?: string;
  }>;
};

export default async function PythonDjangoPage({ searchParams }: PythonDjangoPageProps) {
  if (!isAuthConfigured) {
    redirect("/login");
  }

  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/login");
  }

  const resolvedSearchParams = await searchParams;

  return <PythonDjangoShell initialSectionId={resolvedSearchParams?.modulo} />;
}
