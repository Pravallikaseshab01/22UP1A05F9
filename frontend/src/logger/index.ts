let authToken: string | null = null

export function initLogger(token: string) {
  authToken = token
}

export async function Log(
  stack: "backend" | "frontend",
  level: "debug" | "info" | "warn" | "error" | "fatal",
  pkg:
    | "cache" | "controller" | "cron_job" | "db" | "domain" | "handler"
    | "repository" | "route" | "service" | "api" | "component" | "hook"
    | "page" | "state" | "style" | "auth" | "config" | "middleware" | "utils",
  message: string
) {
  if (!authToken) {
    console.warn("Logger not initialized with token")
    return
  }

  try {
    await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    })
  } catch (err) {
    console.error("Failed to send log", err)
  }
}
