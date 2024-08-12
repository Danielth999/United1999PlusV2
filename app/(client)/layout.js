import { Prompt } from "next/font/google";
import "@/app/globals.css"; // นำเข้าไฟล์ CSS ที่ root
import { Toaster } from "react-hot-toast";
import SessionProvider from "../../components/SessionProvider";
import Navbar from "@/components/Nav/Navbar";
import Footer from "@/components/Footer/Footer";
import Loading from "@/components/common/Loading"; // ปรับเส้นทางการนำเข้า
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const prompt = Prompt({
  subsets: ["latin"],
  weight: ["400", "600"], // เพิ่ม weight ที่ต้องการใช้
});

// Static metadata สำหรับทั้งแอป
export const metadata = {
  title: "United 1999 Plus",
  description: "ร้าน United 1999 Plus แสดงสินค้าและรายละเอียดสินค้าทั้งหมด",
  keywords: "ร้าน, สินค้า, United 1999 Plus, หมวดหมู่",
  openGraph: {
    title: "United 1999 Plus",
    description: "ร้าน United 1999 Plus แสดงสินค้าและรายละเอียดสินค้าทั้งหมด",
    url: "https://yourdomain.com",
    images: [
      {
        url: "https://yourdomain.com/images/default-og-image.jpg",
        alt: "United 1999 Plus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "United 1999 Plus",
    description: "ร้าน United 1999 Plus แสดงสินค้าและรายละเอียดสินค้าทั้งหมด",
    images: ["https://yourdomain.com/images/default-twitter-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="lgf74pzOKh0EhgWQ6MQl0cgd8mfs4uN66G0mizGbO6A"
        />

        <body className={prompt.className}>
          <SessionProvider>
            <Navbar />
            <div className="pt-32 lg:pt-52">
              {" "}
              {/* Adjusted padding-top */}
              <Suspense
                fallback={
                  <div className="flex justify-center h-screen items-center">
                    <Loading />
                  </div>
                }
              >
                {children}
                <SpeedInsights />
              </Suspense>
            </div>
            <Footer />
            <Toaster />
          </SessionProvider>
        </body>
      </head>
    </html>
  );
}
