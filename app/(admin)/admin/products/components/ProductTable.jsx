import Image from "next/image"; // นำเข้า Image component จาก next/image
import { FaEdit, FaTrash, FaEye } from "react-icons/fa"; // นำเข้าไอคอนจาก react-icons/fa
import Pagination from "@/components/common/Pagination"; // นำเข้าคอมโพเนนต์ Pagination จาก path ที่กำหนด
import { format } from "date-fns"; // นำเข้า format ฟังก์ชันจาก date-fns
import { deleteProduct } from "@/utils/products/deleteProduct"; // นำเข้าฟังก์ชัน deleteProduct

const ProductTable = ({
  products,
  currentPage,
  totalPages,
  searchTerm,
  totalProducts,
  onPageChange,
  onDelete, // เพิ่ม props สำหรับการจัดการการลบสินค้า
}) => {
  const formatDateToBuddhistYear = (dateString) => {
    const date = new Date(dateString); // แปลงสตริงวันที่เป็นวัตถุ Date
    const formattedDate = format(date, "dd/MM/"); // จัดรูปแบบวันที่
    const buddhistYear = date.getFullYear() + 543; // คำนวณปีพุทธศักราช
    return `${formattedDate}${buddhistYear}`; // คืนค่าวันที่ที่จัดรูปแบบแล้ว
  };

  const handleDelete = async (productId) => {
    if (confirm("คุณแน่ใจว่าต้องการลบสินค้านี้หรือไม่?")) {
      const success = await deleteProduct(productId); // เรียกใช้ฟังก์ชันลบสินค้า
      if (success) {
        onDelete(productId); // เรียกใช้ฟังก์ชัน onDelete เพื่ออัปเดตรายการสินค้า
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white border-collapse">
        <caption className="text-lg font-semibold my-2">
          รายการสินค้าทั้งหมด{" "}
          <span className="text-red-500">({totalProducts})</span> รายการ
        </caption>
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
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product.productId}>
                <td className="border text-center py-2 px-4">
                  {/* แสดงลำดับของสินค้า */}
                  {index + 1}
                </td>
                <td className="border text-center py-2 px-4">
                  {product.imageUrl && (
                    <Image
                      src={product.imageUrl} // แสดงรูปภาพสินค้า
                      alt={product.name} // ข้อความอธิบายรูปภาพ
                      width={160}
                      height={160}
                      className="object-cover mx-auto border-4"
                    />
                  )}
                </td>
                <td className="border text-center py-2 px-4">{product.name}</td>{" "}
                {/*แสดงชื่อสินค้า */}
                <td className="border text-center py-2 px-4">
                  {formatDateToBuddhistYear(product.createdAt)}
                </td>{" "}
                {/*แสดงวันที่สร้างสินค้า*/}
                <td className="border text-center py-2 px-4">
                  {/* แสดงหมวดหมู่ของสินค้า */}
                  {product.Category?.name}
                </td>
                <td className="border text-center py-2 px-4">
                  <div className="flex space-x-2 justify-center">
                    <button className="px-2 py-1 bg-yellow-500 text-white rounded">
                      <FaEdit size={20}>{/* ปุ่มแก้ไขสินค้า */}</FaEdit>
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleDelete(product.productId)} // เพิ่ม event การลบสินค้า
                    >
                      <FaTrash size={20}>{/* ปุ่มลบสินค้า */}</FaTrash>
                    </button>
                    <button className="px-2 py-1 bg-blue-500 text-white rounded">
                      <FaEye size={20}>{/* ปุ่มดูรายละเอียดสินค้า */}</FaEye>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border text-center py-2 px-4">
                <h1 className="text-red-500">ไม่พบสินค้าที่คุณค้นหา</h1>
              </td>
            </tr>
          )}
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
