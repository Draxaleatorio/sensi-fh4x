export async function notifyLogin() {
  const configuredUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!configuredUrl) return;

  try {
    const url = new URL(configuredUrl);
    if (url.origin !== "https://discord.com" ||
        !/^\/api\/webhooks\/\d+\/[\w-]+$/.test(url.pathname)) {
      console.warn("URL do webhook do Discord inválida.");
      return;
    }

    url.searchParams.set("wait", "true");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      redirect: "error",
      signal: AbortSignal.timeout(5000),
      body: JSON.stringify({
        content: `Novo login na Faster SHOP em <t:${Math.floor(Date.now() / 1000)}:F>.`,
        allowed_mentions: { parse: [] },
      }),
    });

    if (!response.ok) console.warn("Discord recusou o alerta de login.", response.status);
  } catch {
    console.warn("Não foi possível enviar o alerta de login ao Discord.");
  }
}
