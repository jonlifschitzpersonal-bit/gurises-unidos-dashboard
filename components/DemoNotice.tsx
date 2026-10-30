"use client";

import { useLayoutEffect } from "react";
import { Icon } from "@/components/Icon";

// Figma: DemoNotice (02 - Components). Fixed copy, not a prop.
const STORAGE_KEY = "demo-notice";
const DISMISSED = "dismissed";

// Read before the notice is parsed, so a dismissed notice is never painted.
// It sets data-demo-notice on <html>; the demo-dismissed: variant hides the notice.
const hideIfDismissed = `try{if(localStorage.getItem("${STORAGE_KEY}")==="${DISMISSED}")document.documentElement.setAttribute("data-demo-notice","${DISMISSED}")}catch(e){}`;

function markDismissed() {
  document.documentElement.setAttribute("data-demo-notice", DISMISSED);
}

type DemoNoticeProps = {
  /** Element that receives focus when the notice closes (the page content). */
  focusTargetId: string;
};

export function DemoNotice({ focusTargetId }: DemoNoticeProps) {
  // In development, React's Strict Mode remount clears the attribute the
  // inline script set on <html>. This puts it back. No-op in production.
  useLayoutEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === DISMISSED) markDismissed();
    } catch {
      // Storage blocked: the notice shows, which is the safe default.
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, DISMISSED);
    } catch {
      // Storage blocked: the notice still closes for this visit.
    }
    markDismissed();
    document.getElementById(focusTargetId)?.focus();
  }

  return (
    <>
      {/* Runs on the server-rendered page only; on the client it is inert text. */}
      <script
        type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: hideIfDismissed }}
      />
      {/* A named region, not an alert: read in order, without interrupting. */}
      <section
        aria-label="Aviso de datos ficticios"
        className="flex items-start gap-2 border-b border-border-accent bg-bg-accent-subtle py-1 pr-2 pl-4 demo-dismissed:hidden"
      >
        {/* mt-2 aligns the icon with the first line of text (iconSlot in Figma). */}
        <Icon name="info" className="mt-2 text-icon-accent" />
        <p className="min-w-0 flex-1 py-1.5 text-body-sm text-text-default">
          Demo con datos ficticios: no son cifras reales de Gurises Unidos y lo
          que cargues no se guarda.
        </p>
        {/*
          Internal, not a Button: it's the only icon-only button so far, and
          its hover changes the icon color while Button ghost fills the
          background. It moves to Button when a second one appears (Figma
          DemoNotice description).
        */}
        <button
          type="button"
          aria-label="Cerrar aviso"
          onClick={dismiss}
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-sm text-text-muted hover:text-text-default focus-visible:text-text-default focus-visible:outline-2 focus-visible:outline-focus-ring"
        >
          <Icon name="x" />
        </button>
      </section>
    </>
  );
}
