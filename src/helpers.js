export function getPrimaryIndices(steps) {
  const revisitIndices = steps
    .map((step, index) => (step.action === "Revisit" ? index : null))
    .filter((i) => i !== null);

  const continueIndices = steps
    .map((step, index) => (step.action === "Continue" ? index : null))
    .filter((i) => i !== null);

  // Rule 5: Exception → first is Start/Continue and second is Revisit
  if (
    (steps[0]?.action === "Start" || steps[0]?.action === "Continue") &&
    steps[1]?.action === "Revisit"
  ) {
    return [0]; // Only the first is primary
  }

  //Rule 3: Nearest Continue to a Revisit CTA
  if (continueIndices.length > 0 && revisitIndices.length > 0) {
    let closestContinue = null;
    let minDistance = Infinity;

    continueIndices.forEach((ci) => {
      revisitIndices.forEach((ri) => {
        const distance = Math.abs(ci - ri);
        if (distance < minDistance) {
          closestContinue = ci;
          minDistance = distance;
        }
      });
    });

    return [closestContinue];
  }

  // if the first CTa is Continue must be primary
  if (steps[0]?.action === "Continue") {
    return [0];
  }

  //  Rule 2: Revisit → First Start is primary
  if (revisitIndices.length > 0) {
    for (let i = 0; i < steps.length - 1; i++) {
      if (steps[i].action === "Revisit" && steps[i + 1].action === "Start") {
        return [i + 1];
      }
    }
  }

  //  Regla 4: No Continue nor Revisit → First Start
  for (let i = 0; i < steps.length; i++) {
    if (steps[i].action === "Start") return [i];
  }

  // Fallback
  return [];
}
