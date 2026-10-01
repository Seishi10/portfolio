import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jonathan Jude Suico | Security Operations",
  description:
    "Computer Engineering graduate focused on security operations, network analysis, incident investigation, and security tooling, with a secondary foundation in software development.",
  keywords: [
    "Jonathan Jude Suico",
    "security operations",
    "SOC analyst",
    "computer engineering",
    "Cebu",
    "portfolio",
  ],
  authors: [{ name: "Jonathan Jude Suico" }],
  openGraph: {
    title: "Jonathan Jude Suico | Security Operations",
    description:
      "Computer Engineering graduate focused on security operations and network analysis.",
    type: "website",
    locale: "en_PH",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
    
     <body className="min-h-full flex flex-col">
  <Navbar />
  <main className="relative z-10 flex-1">{children}</main>
  <Footer />
</body>
    </html>
  );
}
