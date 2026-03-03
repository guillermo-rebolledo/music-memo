"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => void;
};

const STORAGE_KEY = "music-memo-theme";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return stored ?? (prefersDark ? "dark" : "light");
};

function applyTheme(theme: Theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Syncs the DOM class on initial mount and after SSR hydration.
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";

    // Apply theme synchronously so the View Transition API captures the
    // updated DOM in its "new state" screenshot before cross-fading.
    const switchTheme = () => {
      applyTheme(next);
      setTheme(next);
      window.localStorage.setItem(STORAGE_KEY, next);
    };

    const doc = document as DocumentWithViewTransition;
    if (doc.startViewTransition) {
      doc.startViewTransition(switchTheme);
    } else {
      switchTheme();
    }
  };

  return (
    <button
      type="button"
      className="inline-flex items-center rounded-full border border-border bg-transparent px-3 py-1 text-[10px] text-foreground hover:bg-muted"
      onClick={toggleTheme}
    >
      {theme === "light" ? "dark mode" : "light mode"}
    </button>
  );
}
