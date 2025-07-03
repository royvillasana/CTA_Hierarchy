export function getCTAStyle({ action, index, primaryIndices }) {
  if (action === "Revisit") return "tertiary";
  if (primaryIndices.includes(index)) return "primary";
  return "secondary";
}
