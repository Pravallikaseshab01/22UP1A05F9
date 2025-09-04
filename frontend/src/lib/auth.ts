let token = "";

export async function fetchToken() {
  const res = await fetch("http://20.244.56.144/evaluation-service/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "your-email",
      name: "your-name",
      rollNo: "your-roll",
      accessCode: "your-access",
      clientID: "your-clientID",
      clientSecret: "your-clientSecret"
    })
  });
  const data = await res.json();
  token = data["access token"];
}

export function getToken() {
  return token;
}
