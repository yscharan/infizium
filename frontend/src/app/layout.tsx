import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Courier_Prime } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/context";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
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
      className={`${dmSans.variable} ${dmMono.variable} ${courierPrime.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased subpixel-antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
