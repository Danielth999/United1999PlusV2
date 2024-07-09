import { Inter } from "next/font/google";
import "@/app/globals.css"; // นำเข้าไฟล์ CSS ที่ root
import { Toaster } from "react-hot-toast";
import SessionProvider from "../../components/SessionProvider";
import Navbar from "@/components/Nav/Navbar";
import Footer from "@/components/Footer/Footer";
import Loading from "@/components/common/Loading"; // ปรับเส้นทางการนำเข้า
import { Suspense } from "react";

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
          <div className="pt-32 lg:pt-52"> {/* Adjusted padding-top */}
            <Suspense fallback={
              <div className="flex justify-center h-screen items-center">
                <Loading />
              </div>
            }>
              {children}
            </Suspense>
          </div>
          <Footer />
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
