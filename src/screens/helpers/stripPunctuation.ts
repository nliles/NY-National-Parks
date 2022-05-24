export const stripPunctuation = (term: string) =>
  term
    .toLowerCase()
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, " ");
