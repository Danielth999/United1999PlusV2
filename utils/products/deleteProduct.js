import { toast } from 'react-hot-toast';

export const deleteProduct = async (productId) => {
  try {
    const startTime = Date.now(); // เริ่มจับเวลา

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`, {
      method: 'DELETE',
    });

    const endTime = Date.now(); // จับเวลาสิ้นสุด
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // คำนวณเวลาเป็นวินาที

    if (response.ok) {
      toast.success(`ลบสินค้าสำเร็จ ใช้เวลา ${timeTaken} วินาที`);
      return true;
    } else {
      toast.error('เกิดข้อผิดพลาดในการลบสินค้า');
      return false;
    }
  } catch (error) {
    toast.error('เกิดข้อผิดพลาดในการลบสินค้า');
    console.error('Failed to delete product:', error);
    return false;
  }
};
