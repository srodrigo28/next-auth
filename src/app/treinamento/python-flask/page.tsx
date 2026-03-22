import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthSession, isAuthConfigured } from "@/auth";
import { PythonFlaskShell } from "@/components/training/python-flask-shell";

export const metadata: Metadata = {
  title: "Python Flask | Treinamento",
  description:
    "Trilha protegida de Python Flask integrada ao dashboard de modulos.",
};

type PythonFlaskPageProps = {
  searchParams?: Promise<{
    modulo?: string;
  }>;
};

export default async function PythonFlaskPage({ searchParams }: PythonFlaskPageProps) {
  if (!isAuthConfigured) {
    redirect("/login");
  }

  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/login");
  }

  const resolvedSearchParams = await searchParams;

  return <PythonFlaskShell initialSectionId={resolvedSearchParams?.modulo} />;
}
