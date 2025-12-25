import { Geist, Geist_Mono, Finger_Paint } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fingerPaint = Finger_Paint({
  variable: "--font-finger-paint",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Die, Die, Dice! - Dice Roller",
  description: "Roll virtual dice with customizable sides and quantities. Perfect for games, decision making, and random number generation.",
  keywords: ["dice roller", "virtual dice", "dice game", "random number generator", "d6", "d20", "dice simulator"],
  authors: [{ name: "Die, Die, Dice!" }],
  creator: "Die, Die, Dice!",
  publisher: "Die, Die, Dice!",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: "Die, Die, Dice! - Dice Roller",
    description: "Roll virtual dice with customizable sides and quantities. Perfect for games, decision making, and random number generation.",
    type: "website",
    locale: "en_US",
    siteName: "Die, Die, Dice!",
  },
  twitter: {
    card: "summary_large_image",
    title: "Die, Die, Dice! - Dice Roller",
    description: "Roll virtual dice with customizable sides and quantities. Perfect for games, decision making, and random number generation.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fingerPaint.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
