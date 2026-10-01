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
    "Computer Engineering graduate and software developer building practical projects with JavaScript, Python, Java, embedded systems, and networking foundations.",
  authors: [{ name: "Jonathan Jude Suico" }],
  openGraph: {
    title: "Jonathan Jude Suico | Software Developer",
    description:
      "Computer Engineering graduate building practical software and embedded systems projects.",
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
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
  />
  <Navbar />
  <main className="relative z-10 flex-1">{children}</main>
  <Footer />
</body>
    </html>
  );
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jonathan Jude Suico",
  jobTitle: "Software Developer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Cebu",
  },
  sameAs: [
    "https://www.linkedin.com/in/jonathan-jude-suico-b4231b418",
    "https://www.credly.com/users/jonathan-jude-suico.f68cc045",
  ],
};
