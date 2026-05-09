export function generateCode() {
  const array = new Array(6).fill(0);
  return array.map(() => Math.floor(Math.random() * 10)).join("");
}
