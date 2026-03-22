import { redirect } from "next/navigation";
import { getAuthSession } from "@/auth";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";

export default async function LoginPage() {
  const session = await getAuthSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-1 items-center justify-center px-6 py-16">
      <section className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur md:p-12">
        <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
          Login
        </span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white">
          Entre com sua conta Google
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-300">
          Esta tela centraliza a autenticacao do projeto. Depois do login, voce sera
          redirecionado para o dashboard.
        </p>
        <div className="mt-8 flex justify-center">
          <GoogleSignInButton />
        </div>
      </section>
    </main>
  );
}
