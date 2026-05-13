export function generateCode() {
  const array = new Array(6).fill(0);
  return array.map(() => Math.floor(Math.random() * 10)).join("");
}

export function generateSlug(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\s/g, "-");
}
