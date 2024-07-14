import Image from "next/image"; // นำเข้า Image component จาก next/image
import { FaEdit, FaTrash, FaEye } from "react-icons/fa"; // นำเข้าไอคอนจาก react-icons/fa
import Pagination from "@/components/common/Pagination"; // นำเข้าคอมโพเนนต์ Pagination จาก path ที่กำหนด
import { format } from 'date-fns'; // นำเข้า format ฟังก์ชันจาก date-fns

const ProductTable = ({ products, currentPage, totalPages, searchTerm, totalProducts, onPageChange, }) => {
  const formatDateToBuddhistYear = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = format(date, 'dd/MM/');
    const buddhistYear = date.getFullYear() + 543;
    return `${formattedDate}${buddhistYear}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white border-collapse">
        <caption className="text-lg font-semibold my-2">รายการสินค้าทั้งหมด <span className="text-red-500">({totalProducts})</span> รายการ</caption>
        <thead>
          <tr>
            <th className="border text-center py-2 px-4">ลำดับ</th>
            <th className="border text-center py-2 px-4">รูปภาพ</th>
            <th className="border text-center py-2 px-4">ชื่อสินค้า</th>
            <th className="border text-center py-2 px-4">วันที่สร้าง</th>
            <th className="border text-center py-2 px-4">หมวดหมู่</th>
            <th className="border text-center py-2 px-4">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.productId}>
              <td className="border text-center py-2 px-4">
                {index + 1}
              </td>
              <td className="border text-center py-2 px-4">
                {product.imageUrl && (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={160}
                    height={160}
                    className="object-cover mx-auto border-4"
                  />
                )}
              </td>
              <td className="border text-center py-2 px-4">{product.name}</td>
              <td className="border text-center py-2 px-4">{formatDateToBuddhistYear(product.createdAt)}</td>
              <td className="border text-center py-2 px-4">
                {product.Category?.name}
              </td>
              <td className="border text-center py-2 px-4">
                <div className="flex space-x-2 justify-center">
                  <button className="px-2 py-1 bg-yellow-500 text-white rounded">
                    <FaEdit size={20} />
                  </button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded">
                    <FaTrash size={20} />
                  </button>
                  <button className="px-2 py-1 bg-blue-500 text-white rounded">
                    <FaEye size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="6" className="border text-center py-2 px-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                searchTerm={searchTerm}
                onPageChange={onPageChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
