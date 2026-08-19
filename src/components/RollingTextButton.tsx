"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import {
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const outgoingVariants = {
  rest: { transform: "translateY(0%)" },
  active: { transform: "translateY(100%)" },
};

const incomingVariants = {
  rest: { transform: "translateY(-100%)" },
  active: { transform: "translateY(0%)" },
};

const transition = {
  duration: 0.3,
  ease: [0.338, 0.015, 0.395, 0.959] as const,
};

type SharedProps = {
  label: string;
  /** Optional alternate copy that rolls in on hover/focus */
  rollLabel?: string;
  showChevron?: boolean;
  icon?: ReactNode;
  className?: string;
  contentClassName?: string;
};

type AsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

type AsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
  };

export type RollingTextButtonProps = AsButton | AsLink;

export function RollingTextButton(props: RollingTextButtonProps) {
  const {
    label,
    rollLabel,
    showChevron = true,
    icon,
    className,
    contentClassName,
    ...rest
  } = props;

  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const activeRef = useRef(false);
  const animating = useRef(false);
  const pendingRequest = useRef<boolean | null>(null);
  const hovered = useRef(false);
  const focused = useRef(false);
  const incoming = rollLabel ?? label;

  const updateActive = (next: boolean) => {
    activeRef.current = next;
    setActive(next);
  };

  const requestActive = (next: boolean) => {
    if (reduceMotion) return;

    if (next === activeRef.current) {
      pendingRequest.current = null;
      return;
    }

    if (animating.current) {
      pendingRequest.current = next;
      return;
    }

    animating.current = true;
    updateActive(next);
  };

  const completeAnimation = () => {
    if (!animating.current) return;
    animating.current = false;

    if (
      pendingRequest.current !== null &&
      pendingRequest.current !== activeRef.current
    ) {
      const next = pendingRequest.current;
      pendingRequest.current = null;
      animating.current = true;
      updateActive(next);
    } else {
      pendingRequest.current = null;
    }
  };

  const content = (
    <span
      className={cn("inline-flex items-center gap-2", contentClassName)}
      aria-hidden="true"
    >
      {icon}
      <span className="relative block w-max overflow-hidden leading-none">
        <motion.span
          className="block whitespace-nowrap"
          variants={outgoingVariants}
          initial="rest"
          animate={active ? "active" : "rest"}
          onAnimationComplete={completeAnimation}
          transition={transition}
        >
          {label}
        </motion.span>
        <motion.span
          className="absolute inset-0 block whitespace-nowrap"
          variants={incomingVariants}
          initial="rest"
          animate={active ? "active" : "rest"}
          transition={transition}
        >
          {incoming}
        </motion.span>
      </span>
      {showChevron ? (
        <span className="inline-flex shrink-0" aria-hidden>
          <ChevronRight size={16} strokeWidth={2} />
        </span>
      ) : null}
    </span>
  );

  const onMouseEnter = () => {
    hovered.current = true;
    requestActive(true);
  };
  const onMouseLeave = () => {
    hovered.current = false;
    requestActive(focused.current);
  };
  const onFocus = () => {
    focused.current = true;
    requestActive(true);
  };
  const onBlur = () => {
    focused.current = false;
    requestActive(hovered.current);
  };

  const classes = cn("inline-flex cursor-pointer items-center", className);

  if ("href" in props && props.href != null) {
    const { href, ...anchorRest } = rest as Omit<AsLink, keyof SharedProps>;
    return (
      <a
        href={href}
        className={classes}
        aria-label={props["aria-label"] ?? label}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  const buttonRest = rest as Omit<AsButton, keyof SharedProps>;
  return (
    <button
      type={buttonRest.type ?? "button"}
      className={classes}
      aria-label={props["aria-label"] ?? label}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      {...buttonRest}
    >
      {content}
    </button>
  );
}
