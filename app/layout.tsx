import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Visibility",
  description:
    "Cómo aparece tu marca en las respuestas de ChatGPT, Gemini, Perplexity y Claude.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
