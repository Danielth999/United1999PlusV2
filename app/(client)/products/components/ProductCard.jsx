import Image from "next/image";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";

const ProductCard = ({ product }) => {
  return (
    <Card className="shadow-md h-full flex flex-col transform transition duration-300 hover:scale-105 hover:border hover:border-[#2563eb]">
      <div className="relative w-full pb-[100%]"> {/* ตั้งค่า aspect ratio เป็น 1:1 */}
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill // ใช้ fill ตามคำแนะนำของ Next.js
          className="object-cover rounded-t-lg " // ใช้ object-cover เพื่อให้ภาพไม่บิดเบี้ยวและเพิ่มเอฟเฟกต์ hover
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // กำหนด sizes ตามขนาดหน้าจอ
          priority // ใช้ priority เพื่อให้ภาพโหลดเร็วขึ้น
        />
      </div>
      <CardContent className="p-4 flex-grow flex flex-col">
        <CardTitle className="text-base sm:text-lg md:text-xl lg:text-xl font-bold line-clamp-2 transition-colors duration-300 hover:text-gray-700">
          {product.name}
        </CardTitle>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
