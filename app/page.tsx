import { LoginScreen } from "@/components/login-screen";
import { SensitivityPanel } from "@/components/sensitivity-panel";
import { hasSession } from "@/lib/session";

export default async function Home() {
  return (await hasSession()) ? <SensitivityPanel /> : <LoginScreen />;
}
