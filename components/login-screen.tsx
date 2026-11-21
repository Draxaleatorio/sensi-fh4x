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
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-border/20 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-border/10 rounded-full animate-ping opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-border/5 rounded-full" />
        
        {/* Floating crosshairs */}
        {[...Array(6)].map((_, i) => (
          <Crosshair
            key={i}
            className="absolute text-muted-foreground/20 animate-bounce"
            style={{
              top: `${(13 + i * 31) % 100}%`,
              left: `${(29 + i * 23) % 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
            }}
            size={20 + i * 5}
          />
        ))}
      </div>

      <div
        className={`relative z-10 w-full max-w-md transition-transform ${
          error && !pending ? "animate-shake" : ""
        }`}
      >
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-card border border-border mb-4 relative group">
            <Crosshair className="w-10 h-10 text-foreground transition-transform group-hover:rotate-45 duration-500" />
            <div className="absolute inset-0 rounded-2xl border border-foreground/20 scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            Faster SHOP
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerador de Sensibilidade Profissional
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border rounded-2xl p-8 backdrop-blur-sm animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <Lock className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Acesso Restrito
              </h2>
              <p className="text-sm text-muted-foreground">
                Digite a senha para continuar
              </p>
            </div>
          </div>

          <form action={submitLogin} className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                aria-label="Senha"
                aria-invalid={Boolean(error) && !pending}
                required
                placeholder="Digite a senha..."
                className={`h-14 text-lg bg-secondary border-border pr-12 transition-all duration-300 focus:ring-2 focus:ring-foreground/20 ${
                  error ? "border-destructive ring-2 ring-destructive/20" : ""
                }`}
              />
              <button
                type="button"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && !pending && (
              <p role="alert" className="text-destructive text-sm animate-fade-in">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={pending}
              className="w-full h-14 text-lg font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {pending ? "Entrando…" : "Entrar no Painel"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              Por drax
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
