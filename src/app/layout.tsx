import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "@/components/themeProvider";
import "./globals.css";

const orbitron = localFont({
  src: "./fonts/orbitron-medium-webfont.woff",
  variable: "--font-orbitron",
});

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Vision Twenty",
  description:
    "Vision Twenty helps you practice the 20-20-20 rule — every 20 minutes, look at something 20 feet away for 20 seconds — to reduce eye strain and protect your vision during screen time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Vision20" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={`${geist.variable} ${orbitron.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
