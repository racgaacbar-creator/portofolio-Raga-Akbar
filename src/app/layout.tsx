import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Raga Akbar - Designer & AR Developer",
  description: "Portfolio of Raga Akbar, Informatics Engineering student and Designer & AR Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ paddingTop: '80px', paddingBottom: '40px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
