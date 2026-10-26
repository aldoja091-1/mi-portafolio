import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aldo Justo Alonso | Ingeniero Mecatrónico",
  description:
    "Portafolio de Aldo Justo Alonso: ingeniería de procesos, calidad, mejora continua y automatización.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="8fcb2b91-b502-462a-971c-ec49b62f9897"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
