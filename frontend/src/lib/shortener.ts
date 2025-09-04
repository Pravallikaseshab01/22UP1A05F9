import { getByAlias, upsert } from "./storage";

export function createShortUrl(originalUrl: string, alias?: string, validity?: number) {
  if (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")) throw new Error("Invalid URL format");
  let finalAlias = alias || Math.random().toString(36).substring(2, 8);
  while (getByAlias(finalAlias)) {
    finalAlias = Math.random().toString(36).substring(2, 8);
  }
  const mins = validity && validity >= 1 ? validity : 30;
  const now = new Date();
  const expires = new Date(now.getTime() + mins * 60000);
  const shortUrl = `http://localhost:3000/${finalAlias}`;
  const data = {
    id: Date.now(),
    originalUrl,
    shortUrl,
    alias: finalAlias,
    createdAt: now.toISOString(),
    validUntil: expires.toISOString(),
    clicks: [],
  };
  upsert(data);
  return data;
}
