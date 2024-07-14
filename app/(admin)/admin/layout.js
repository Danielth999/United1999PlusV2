import Sidebar from "@/components/Admin/Sidebar"; // นำเข้า Sidebar จาก components
import "@/app/globals.css"; // นำเข้าไฟล์ CSS ที่ root
import { Toaster } from 'react-hot-toast';
export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-100">
          <Sidebar isExpanded={true} />
          <main className="flex-1 p-2 overflow-y-auto">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
