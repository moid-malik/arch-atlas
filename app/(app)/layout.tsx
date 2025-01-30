import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
export const metadata: Metadata = {
  title: "Arch",
  description: "Arch-Atlas, An Online Shoes Store.",
};

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main className="min-h-screen pt-[40px] overflow-hidden">{children}</main>
        <div className="mt-80">
            <Footer/>
        </div>
      </body>
    </html>
  );
}
