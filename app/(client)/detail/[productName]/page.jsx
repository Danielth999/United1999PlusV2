'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import Loading from '@/components/common/Loading';
import ProductDetailsClient from '../components/ProductDetailsClient';

// ฟังก์ชัน fetcher สำหรับ SWR
const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function ProductDetail() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  const { data: product, error, isLoading } = useSWR(
    productId ? `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}` : null,
    fetcher,
    {
      dedupingInterval: 60000, // 1 นาที
      revalidateOnFocus: false, // ไม่ revalidate เมื่อ focus
    }
  );

  // ใช้ useEffect เพื่ออัพเดต title ของหน้า
  useEffect(() => {
    if (product) {
      document.title = `${product.name} - รายละเอียดสินค้า`;
    } else if (isLoading) {
      document.title = 'กำลังโหลด...';
    } else if (error) {
      document.title = 'ข้อผิดพลาด - ไม่สามารถดึงข้อมูลสินค้าได้';
    } else if (!productId) {
      document.title = 'ข้อผิดพลาด - รหัสสินค้าหายไปจาก URL';
    }
  }, [product, isLoading, error, productId]);

  // ตรวจสอบว่า productId ถูกกำหนดหรือไม่
  if (!productId) {
    return (
      <main>
        <section className="container mx-auto px-4">
          <div className="flex flex-col items-center mt-10">
            <h1 className="font-bold text-2xl text-black">ข้อผิดพลาด</h1>
            <p className="mt-5">รหัสสินค้าหายไปจาก URL</p>
          </div>
        </section>
      </main>
    );
  }

  // แสดงสถานะ Loading ขณะที่ข้อมูลกำลังถูกดึง
  if (isLoading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <Loading />
      </div>
    );
  }

  // แสดงข้อผิดพลาดหากมีปัญหาในการดึงข้อมูล
  if (error) {
    return (
      <main>
        <section className="container mx-auto px-4">
          <div className="flex flex-col items-center mt-10">
            <h1 className="font-bold text-2xl text-black">ข้อผิดพลาด</h1>
            <p className="mt-5">เกิดข้อผิดพลาดขณะดึงข้อมูลสินค้า: {error.message}</p>
          </div>
        </section>
      </main>
    );
  }

  // แสดงข้อมูลสินค้าหากดึงข้อมูลสำเร็จ
  return (
    <main className="">
      <ProductDetailsClient product={product} />
    </main>
  );
}
