import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InterviewIQ",
  description: "InterviewIQ is your ultimate interview preparation hub, designed to help job seekers ace every round—from behavioral questions to technical challenges. Whether you're prepping for FAANG tech interviews, consulting case studies, or corporate job screenings, our AI-powered mock interviews, expert-crafted guides, and real-time feedback will boost your confidence and sharpen your skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
