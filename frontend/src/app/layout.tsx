import type { Metadata } from "next";
import { Geist, Geist_Mono, Courier_Prime } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/context";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  variable: "--font-typewriter",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Infizium — School Operating System for Telangana",
  description:
    "WhatsApp-first school platform connecting students, parents, teachers, and administrators. Prepare students for life, not just exams.",
  keywords: ["school management", "Telangana", "WhatsApp", "education", "student tracking"],
  openGraph: {
    title: "Infizium — School Operating System",
    description: "Prepare students for life, not just exams.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${courierPrime.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
