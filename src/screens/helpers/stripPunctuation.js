export const stripPunctuation = (string) =>
  string
    .toLowerCase()
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, " ");
