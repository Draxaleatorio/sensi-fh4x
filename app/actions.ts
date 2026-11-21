"use server";

import { after } from "next/server";
import { endSession, matchesSecret, startSession } from "@/lib/session";
import { notifyLogin } from "@/lib/discord";

export async function login(_previousError: string, formData: FormData) {
  const expected = process.env.SITE_PASSWORD;
  if (!expected || !process.env.SESSION_SECRET) {
    return "Acesso indisponível. Verifique a configuração do site.";
  }

  const password = formData.get("password");
  if (typeof password !== "string" || !matchesSecret(password, expected)) {
    return "Senha incorreta. Tente novamente.";
  }

  if (!(await startSession())) return "Não foi possível iniciar a sessão.";

  after(notifyLogin);
  return "";
}

export async function logout() {
  await endSession();
}
