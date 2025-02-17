import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "./components/Header";
import Provider from "@/Provider";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IMdB Clone",
  description: "this is movie database clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <Suspense fallback={<div>Loading header...</div>}>
            <Header />
          </Suspense>
          <Suspense fallback={<div>Loading navbar...</div>}>
            <Navbar />
          </Suspense>
          <Suspense fallback={<div>Loading search box...</div>}>
            <SearchBox />
          </Suspense>
          {children}
          <Suspense fallback={<div>Loading footer...</div>}>
            <Footer />
          </Suspense>
        </Provider>
      </body>
    </html>
  );
}
