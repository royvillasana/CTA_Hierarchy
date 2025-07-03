import React from "react";
import { getCTAStyle } from "./ctaRules";
import { getPrimaryIndices } from "./helpers";
import "./styles.css";

const steps = [
  {
    id: 1,
    tileLabel: "Company Setup",
    blockLabel: "What to have ready",
    action: "Revisit",
  },
  {
    id: 2,
    tileLabel: "People Setup",
    blockLabel: "Answer filing questions",
    action: "Start",
  },
  {
    id: 3,
    tileLabel: "Payroll Setup",
    blockLabel: "Review state and local tax info",
    action: "Continue",
  },
  {
    id: 4,
    tileLabel: "Tax & Documents Setup",
    blockLabel: "Sign documents",
    action: "start",
  },
  {
    id: 5,
    tileLabel: "Retirement Setup",
    blockLabel: "Submit completed payroll and tax info",
    action: "Start",
  },
];

const CTAButton = ({ label, style, disabled }) => {
  const classMap = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    tertiary: "btn-tertiary",
  };

  return (
    <button className={classMap[style]} disabled={disabled}>
      {label}
    </button>
  );
};

export default function App() {
  const primaryIndices = getPrimaryIndices(steps);

  // Rule 1: If the first CTA is Start or Continue, disable the rest
  const shouldDisableOthers =
    (steps[0]?.action === "Start" || steps[0]?.action === "Continue") &&
    steps[1]?.action !== "Revisit";

  return (
    <div className="App">
      <h2>Onboarding Tiles</h2>
      <div className="wrapper">
        {steps
          .filter((step) => step.tileLabel)
          .map((step, index) => {
            const style = getCTAStyle({ ...step, index, primaryIndices });
            const disabled = shouldDisableOthers && index !== 0;

            return (
              <div key={step.id} className="step-tile">
                <div className="circle"></div>
                <div className="step-title">{step.tileLabel}</div>
                <CTAButton
                  label={step.action}
                  style={style}
                  disabled={disabled}
                />
              </div>
            );
          })}
      </div>

      <h2>Activity Rows</h2>
      {steps.map((step, index) => {
        const style = getCTAStyle({ ...step, index, primaryIndices });
        const disabled = shouldDisableOthers && index !== 0;

        return (
          <div key={step.id} className="step-block">
            <div className="step-title">{step.blockLabel}</div>
            <CTAButton label={step.action} style={style} disabled={disabled} />
          </div>
        );
      })}
    </div>
  );
}
