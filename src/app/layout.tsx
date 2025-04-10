import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const neopixel = localFont({
  src: [
    {
      path: "./fonts/neopixel.woff",
      weight: "400",
    },
    {
      path: "./fonts/neopixel.woff2",
      weight: "400",
    },
  ],
  variable: "--font-neopixel",
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
    <html lang="en">
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
      <body className={`${geist.variable} ${neopixel.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
