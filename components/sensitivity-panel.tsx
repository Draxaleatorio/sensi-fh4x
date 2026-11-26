"use client";

import { useState } from "react";
import { logout } from "@/app/actions";
import {
  Crosshair,
  Smartphone,
  Gamepad2,
  Zap,
  Copy,
  Check,
  RefreshCw,
  Target,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const playStyles = [
  { id: "claw2", name: "2 Dedos", icon: "II" },
  { id: "claw3", name: "3 Dedos", icon: "III" },
  { id: "claw4", name: "4 Dedos (Claw)", icon: "IV" },
  { id: "claw6", name: "6 Dedos", icon: "VI" },
];

const gameModes = [
  { id: "ranked", name: "Ranqueada", desc: "Precisao maxima" },
  { id: "casual", name: "Casual", desc: "Balanceado" },
  { id: "training", name: "Treino", desc: "Alta resposta" },
];

interface Sensitivity {
  phoneModel: string;
  playStyle: string;
  gameMode: string;
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  scopeAWM: number;
  freeLook: number;
  fireButton: number;
}

export function SensitivityPanel() {
  const [phoneModel, setPhoneModel] = useState("");
  const [playStyle, setPlayStyle] = useState("");
  const [gameMode, setGameMode] = useState("");
  const [sensitivity, setSensitivity] = useState<Sensitivity | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const generateSensitivity = () => {
    if (!phoneModel.trim() || !playStyle || !gameMode) return;

    setIsGenerating(true);
    setSensitivity(null);
    setCopyStatus("idle");

    setTimeout(() => {
      const style = playStyles.find((s) => s.id === playStyle);
      const mode = gameModes.find((m) => m.id === gameMode);

      let baseMultiplier = 1;

      if (style?.id === "claw2") baseMultiplier *= 0.85;
      if (style?.id === "claw3") baseMultiplier *= 1.0;
      if (style?.id === "claw4") baseMultiplier *= 1.15;
      if (style?.id === "claw6") baseMultiplier *= 1.3;

      if (mode?.id === "ranked") baseMultiplier *= 1.0;
      if (mode?.id === "casual") baseMultiplier *= 1.1;
      if (mode?.id === "training") baseMultiplier *= 1.2;

      const randomInRange = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      setSensitivity({
        phoneModel: phoneModel.trim(),
        playStyle: style?.name ?? "",
        gameMode: mode?.name ?? "",
        general: Math.min(200, Math.floor(randomInRange(80, 150) * baseMultiplier)),
        redDot: Math.min(200, Math.floor(randomInRange(70, 140) * baseMultiplier)),
        scope2x: Math.min(200, Math.floor(randomInRange(60, 130) * baseMultiplier)),
        scope4x: Math.min(200, Math.floor(randomInRange(50, 120) * baseMultiplier)),
        scopeAWM: Math.min(200, Math.floor(randomInRange(40, 100) * baseMultiplier)),
        freeLook: Math.min(200, Math.floor(randomInRange(90, 170) * baseMultiplier)),
        fireButton: Math.min(200, Math.floor(randomInRange(70, 150) * baseMultiplier)),
      });

      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = async () => {
    if (!sensitivity) return;

    const text = `Wave System #2027 | Sensibilidade Gerada

Celular: ${sensitivity.phoneModel}
Estilo: ${sensitivity.playStyle}
Modo: ${sensitivity.gameMode}

Configuracoes:
- Geral: ${sensitivity.general}
- Red Dot: ${sensitivity.redDot}
- Mira 2x: ${sensitivity.scope2x}
- Mira 4x: ${sensitivity.scope4x}
- AWM/Sniper: ${sensitivity.scopeAWM}
- Olhar Livre: ${sensitivity.freeLook}
- Botao de Tiro: ${sensitivity.fireButton}

Wave System #2027`;

    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center">
              <img src="/wave-art.jpg" alt="Wave Accounts" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Wave System #2027</h1>
              <p className="text-xs text-muted-foreground">Painel de Controle</p>
            </div>
          </div>
          <form action={logout}>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </form>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight text-balance">
            Gere sua Sensibilidade
            <br />
            <span className="text-primary">Perfeita</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Digite seu celular, escolha seu estilo de jogo e modo para gerar a
            sensibilidade ideal para voce.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-foreground/30 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Modelo do Celular</h3>
                <p className="text-sm text-muted-foreground">Digite seu dispositivo</p>
              </div>
            </div>
            <Input
              type="text"
              placeholder="Ex: iPhone 15, Samsung S24, Redmi Note 12..."
              value={phoneModel}
              onChange={(e) => setPhoneModel(e.target.value)}
              className="w-full h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-foreground/30 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Estilo de Jogo</h3>
                <p className="text-sm text-muted-foreground">Quantos dedos voce usa</p>
              </div>
            </div>
            <Select value={playStyle} onValueChange={setPlayStyle}>
              <SelectTrigger className="w-full h-12 bg-secondary border-border">
                <SelectValue placeholder="Selecione o estilo" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {playStyles.map((style) => (
                  <SelectItem
                    key={style.id}
                    value={style.id}
                    className="cursor-pointer hover:bg-secondary"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">[{style.icon}]</span>
                      {style.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-foreground/30 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Modo de Jogo</h3>
                <p className="text-sm text-muted-foreground">Tipo de partida</p>
              </div>
            </div>
            <Select value={gameMode} onValueChange={setGameMode}>
              <SelectTrigger className="w-full h-12 bg-secondary border-border">
                <SelectValue placeholder="Selecione o modo" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {gameModes.map((mode) => (
                  <SelectItem
                    key={mode.id}
                    value={mode.id}
                    className="cursor-pointer hover:bg-secondary"
                  >
                    <span className="flex flex-col">
                      <span>{mode.name}</span>
                      <span className="text-xs text-muted-foreground">{mode.desc}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <Button
            size="lg"
            onClick={generateSensitivity}
            disabled={!phoneModel.trim() || !playStyle || !gameMode || isGenerating}
            className="h-16 px-12 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all duration-300 hover:scale-105 active:scale-95 rounded-2xl"
          >
            {copyStatus === "error" && (
              <p role="alert" className="mb-3 text-sm text-destructive">
                Não foi possível copiar. Tente novamente.
              </p>
            )}

            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Gerar Sensibilidade
              </>
            )}
          </Button>
        </div>

        {(sensitivity || isGenerating) && (
          <div className="bg-card border border-border rounded-2xl p-4 sm:p-8 animate-slide-up">
            <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Crosshair className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Sua Sensibilidade
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Configuracoes otimizadas para voce
                  </p>
                </div>
              </div>
              {sensitivity && (
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateSensitivity}
                    className="border-border hover:bg-secondary bg-transparent"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Gerar Novamente
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="border-border hover:bg-secondary bg-transparent"
                  >
                    {copyStatus === "copied" ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>

            {isGenerating ? (
              <div className="space-y-4">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-32 h-4 bg-secondary rounded animate-pulse" />
                    <div className="flex-1 h-3 bg-secondary rounded animate-pulse" />
                    <div className="w-12 h-6 bg-secondary rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <SensitivityBar label="Geral" value={sensitivity!.general} maxValue={200} />
                <SensitivityBar label="Red Dot" value={sensitivity!.redDot} maxValue={200} />
                <SensitivityBar label="Mira 2x" value={sensitivity!.scope2x} maxValue={200} />
                <SensitivityBar label="Mira 4x" value={sensitivity!.scope4x} maxValue={200} />
                <SensitivityBar label="AWM/Sniper" value={sensitivity!.scopeAWM} maxValue={200} />
                <SensitivityBar label="Olhar Livre" value={sensitivity!.freeLook} maxValue={200} />
                <SensitivityBar label="Botao de Tiro" value={sensitivity!.fireButton} maxValue={200} />
              </div>
            )}

            {sensitivity && (
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-secondary rounded-full text-sm text-muted-foreground">
                    {sensitivity!.phoneModel}
                  </span>
                  <span className="px-3 py-1 bg-secondary rounded-full text-sm text-muted-foreground">
                    {sensitivity!.playStyle}
                  </span>
                  <span className="px-3 py-1 bg-secondary rounded-full text-sm text-muted-foreground">
                    {sensitivity!.gameMode}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-3">
              <Target className="w-5 h-5 text-foreground" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Dica de Mira</h4>
            <p className="text-sm text-muted-foreground">
              Teste a sensibilidade no modo treino antes de usar em ranqueada.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-3">
              <Zap className="w-5 h-5 text-foreground" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Ajuste Fino</h4>
            <p className="text-sm text-muted-foreground">
              Ajuste +/- 10 pontos de acordo com seu conforto pessoal.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-3">
              <RefreshCw className="w-5 h-5 text-foreground" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Consistencia</h4>
            <p className="text-sm text-muted-foreground">
              Treine por 3-5 dias antes de mudar novamente.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          Wave System #2027 · Gerador de Sensibilidade para Free Fire
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

function SensitivityBar({
  label,
  value,
  maxValue,
}: {
  label: string;
  value: number;
  maxValue: number;
}) {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <span className="w-24 sm:w-32 shrink-0 text-sm text-muted-foreground font-medium">{label}</span>
      <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-12 text-right font-bold text-foreground">{value}</span>
    </div>
  );
}
