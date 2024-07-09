"use client";
import Sidebar from "@/components/admin/Sidebar";
import "@/app/globals.css"; // นำเข้าไฟล์ CSS ที่ root
export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-100">
          <Sidebar isExpanded={true} />
          <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
