import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DemoNotice } from "@/components/DemoNotice";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gurises Unidos · Dashboard",
  description:
    "Alcance y resultados de los proyectos de Gurises Unidos, para informar a donantes.",
};

const CONTENT_ID = "content";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: DemoNotice's inline script may add
    // data-demo-notice to <html> before React hydrates.
    <html
      lang="es"
      className={`${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <DemoNotice focusTargetId={CONTENT_ID} />
        {/*
          Focus target when the notice closes (later, also for "Saltar al contenido").
          It is not interactive, so it gets no focus ring.
        */}
        <div id={CONTENT_ID} tabIndex={-1} className="focus:outline-none">
          {children}
        </div>
      </body>
    </html>
  );
}
