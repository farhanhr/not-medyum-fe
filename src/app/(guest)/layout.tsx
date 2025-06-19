import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medyum",
  description: "Some place to write something",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased text0=-gray-800 ${inter.variable}`}>
          <Navbar />
        <main className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8">
          {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}
