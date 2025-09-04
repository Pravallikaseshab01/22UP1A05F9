export type ClickEvent = {
  id: string
  ts: string
  source: string
  timeZone?: string
  locale?: string
}

export type ShortItem = {
  id: string
  alias: string
  originalUrl: string
  createdAt: string
  expiresAt?: string | null
  clicks: number
  shortUrl: string
  clickEvents: ClickEvent[]
}
