import { Inter } from "next/font/google";
import "./globals.css";
// lib
import { Toaster } from "react-hot-toast";
import SessionProvider from "../components/SessionProvider";

//components
import Navbar from "@/components/Nav/Navbar";
import Footer from "@/components/Footer/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "United 1999 Plus",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
