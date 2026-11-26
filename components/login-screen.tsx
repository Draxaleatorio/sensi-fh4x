"use client";

import { useActionState, useState } from "react";
import { login } from "@/app/actions";
import { Lock, Eye, EyeOff, Crosshair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, submitLogin, pending] = useActionState(login, "");

  return (
    <main className="login-shell">
      <div className="login-top"><span className="brand-mark">W<span>.</span></span><span>WAVE SYSTEM <b>#2027</b></span><span className="top-status"><i /> SISTEMA ONLINE</span></div>
      <div className="login-layout">
        <section className="login-intro">
          <div className="eyebrow"><span /> WAVE SYSTEM #2027</div>
          <h1>SUA MIRA.<br /><em>SUAS REGRAS.</em></h1>
          <p>Encontre a sensibilidade ideal para o seu estilo de jogo e entre em campo preparado.</p>
          <div className="intro-bottom"><Crosshair size={19} /> GERADOR DE SENSIBILIDADE <span> / FREE FIRE</span></div>
        </section>
        <section className={`login-card ${error && !pending ? "animate-shake" : ""}`}>
          <div className="card-art"><img src="/wave-logo.gif" alt="Wave Accounts" /></div>
          <div className="card-content">
            <div className="card-kicker"><span /> ÁREA EXCLUSIVA</div>
            <h2>Bem-vindo à Wave<span>.</span></h2>
            <p>Digite sua senha para acessar o painel.</p>
            <form action={submitLogin} className="login-form">
              <label htmlFor="password">SENHA DE ACESSO</label>
              <div className="relative">
                <Lock className="input-lock" size={18} />
                <Input id="password" type={showPassword ? "text" : "password"} name="password" autoComplete="current-password" aria-invalid={Boolean(error) && !pending} required placeholder="Digite sua senha" className={`login-input ${error ? "border-destructive" : ""}`} />
                <button type="button" aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"} onClick={() => setShowPassword(!showPassword)} className="password-toggle">{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button>
              </div>
              {error && !pending && <p role="alert" className="text-destructive text-sm">{error}</p>}
              <Button type="submit" disabled={pending} className="wave-button">{pending ? "Entrando…" : "ACESSAR PAINEL"}<span>↗</span></Button>
            </form>
            <div className="card-footer"><Lock size={13} /> ACESSO SEGURO <span>WAVE SYSTEM #2027</span></div>
          </div>
        </section>
      </div>
      <div className="login-bottom"><span>© 2027 WAVE SYSTEM</span><span>DESENVOLVIDO PARA A SUA MELHOR JOGADA</span></div>
    </main>
  );
}
