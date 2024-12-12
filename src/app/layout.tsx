import type { Metadata } from "next";
import { Creepster } from "next/font/google";
import "./globals.css";
import Link from "next/link";

export const runtime = "edge";

const creepster = Creepster({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Rick and Morty Universe",
  description:
    "Explore characters, locations, and episodes from the Rick and Morty universe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-gray-900 text-white ${creepster.className}`}>
        <nav className="bg-gray-800 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-yellow-400">
              <Link href="/">Rick and Morty</Link>
            </h1>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:text-yellow-400 transition">
                  Characters
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className="hover:text-yellow-400 transition"
                >
                  Locations
                </Link>
              </li>
              <li>
                <Link
                  href="/episodes"
                  className="hover:text-yellow-400 transition"
                >
                  Episodes
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
