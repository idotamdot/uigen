import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "UIGen — Interface Alchemy",
    template: "%s · Interface Alchemy",
  },
  description:
    "Describe the feeling. Generate the interface. UIGen turns creative intent into live, editable React experiences.",
  applicationName: "UIGen Interface Alchemy",
  keywords: [
    "AI UI generator",
    "React generator",
    "interface design",
    "website builder",
    "Interface Alchemy",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
