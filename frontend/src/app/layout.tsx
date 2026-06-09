import type { Metadata } from "next";
import { Space_Grotesk, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/context";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-body antialiased subpixel-antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
