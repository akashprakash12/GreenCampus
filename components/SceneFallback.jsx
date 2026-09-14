"use client";

import { Component } from "react";

export function canUseWebGL() {
  if (typeof document === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true }) ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function isLowPowerDevice() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }

  const prefersReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    prefersReducedMotion ||
    navigator.hardwareConcurrency <= 4 ||
    navigator.deviceMemory <= 4
  );
}

export function SceneUnavailable({ label = "3D view unavailable" }) {
  return (
    <div
      role="status"
      className="flex h-full min-h-32 items-center justify-center px-6 text-center text-xs uppercase tracking-[0.2em] text-[#a8bd8f]"
    >
      {label}
    </div>
  );
}

export class SceneErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <SceneUnavailable label="3D view unavailable on this browser" />
      );
    }

    return this.props.children;
  }
}