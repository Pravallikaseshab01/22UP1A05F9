export function getAll() {
  const raw = localStorage.getItem("urls");
  return raw ? JSON.parse(raw) : [];
}

export function getByAlias(alias: string) {
  return getAll().find((u: any) => u.alias === alias);
}

export function saveMany(items: any[]) {
  localStorage.setItem("urls", JSON.stringify(items));
}

export function upsert(item: any) {
  const all = getAll();
  const idx = all.findIndex((u: any) => u.alias === item.alias);
  if (idx >= 0) all[idx] = item;
  else all.push(item);
  saveMany(all);
}

export function remove(id: number) {
  const all = getAll().filter((u: any) => u.id !== id);
  saveMany(all);
}

export function recordClick(alias: string, click: any) {
  const all = getAll();
  const idx = all.findIndex((u: any) => u.alias === alias);
  if (idx >= 0) {
    all[idx].clicks.push(click);
    saveMany(all);
  }
}
