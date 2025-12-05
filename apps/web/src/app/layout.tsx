import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Logue - Collaborative Screenwriting",
  description: "Real-time collaborative screenwriting editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
