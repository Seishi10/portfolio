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
  title: "Jonathan Jude Suico | Software Developer",
  description:
    "Computer Engineering graduate and software developer portfolio — projects, skills, and experience in software development, networking, and embedded systems.",
  keywords: [
    "Jonathan Jude Suico",
    "software developer",
    "computer engineering",
    "Cebu",
    "portfolio",
  ],
  authors: [{ name: "Jonathan Jude Suico" }],
  openGraph: {
    title: "Jonathan Jude Suico | Software Developer",
    description:
      "Computer Engineering graduate and software developer portfolio — projects, skills, and experience.",
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
  <main className="flex-1">{children}</main>
  <Footer />
</body>
    </html>
  );
}
