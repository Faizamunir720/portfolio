"use client";

import {
  useCallback,
  useId,
  useState,
  type ReactNode,
} from "react";

type AccordionProps = {
  summary: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Expand/collapse with grid-template-rows 0fr → 1fr (zero height when closed). */
export function Accordion({ summary, children, className = "" }: AccordionProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggle = useCallback(() => setOpen((v) => !v), []);

  return (
    <div className={`accordion ${open ? "is-open" : ""} ${className}`}>
      <button
        type="button"
        className="accordion-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
      >
        <span>{summary}</span>
        <span className="accordion-arrow" aria-hidden="true">
          →
        </span>
      </button>
      <div
        id={panelId}
        className="accordion-panel"
        role="region"
        aria-hidden={!open}
      >
        <div className="accordion-panel-inner">{children}</div>
      </div>
    </div>
  );
}
