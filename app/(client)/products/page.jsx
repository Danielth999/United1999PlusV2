import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";

// Fetch products on the server-side
async function fetchProducts(searchTerm = "", page = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?search=${encodeURIComponent(searchTerm)}&page=${page}&limit=20`
    );

    if (!res.ok) {
      throw new Error(`An error occurred: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return { products: [], totalProducts: 0, currentPage: 1, totalPages: 1 };
  }
}

export async function generateMetadata({ searchParams }) {
  const searchTerm = searchParams.search || "";
  const page = parseInt(searchParams.page) || 1;

  return {
    title: searchTerm
      ? `ผลการค้นหาสำหรับ "${searchTerm}" - United 1999 Plus`
      : "สินค้าทั้งหมด - United 1999 Plus",
    description: searchTerm
      ? `ดูผลการค้นหาสำหรับ "${searchTerm}" บน United 1999 Plus พบสินค้าที่เกี่ยวข้องมากมาย`
      : "สำรวจสินค้าทั้งหมดบน United 1999 Plus ที่มีคุณภาพและราคาดี",
    keywords: searchTerm
      ? `${searchTerm}, ค้นหาสินค้า, United 1999 Plus, ซื้อสินค้าออนไลน์`
      : "สินค้าทั้งหมด, United 1999 Plus, ซื้อสินค้าออนไลน์",
    openGraph: {
      title: searchTerm
        ? `ผลการค้นหาสำหรับ "${searchTerm}" - United 1999 Plus`
        : "สินค้าทั้งหมด - United 1999 Plus",
      description: searchTerm
        ? `ดูผลการค้นหาสำหรับ "${searchTerm}" บน United 1999 Plus พบสินค้าที่เกี่ยวข้องมากมาย`
        : "สำรวจสินค้าทั้งหมดบน United 1999 Plus ที่มีคุณภาพและราคาดี",
      url: `https://yourdomain.com/products?search=${encodeURIComponent(searchTerm)}&page=${page}`,
      images: [
        {
          url: "https://yourdomain.com/images/default-og-image.jpg",
          alt: searchTerm
            ? `ภาพผลการค้นหาสำหรับ "${searchTerm}"`
            : "ภาพสินค้าทั้งหมด",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: searchTerm
        ? `ผลการค้นหาสำหรับ "${searchTerm}" - United 1999 Plus`
        : "สินค้าทั้งหมด - United 1999 Plus",
      description: searchTerm
        ? `ดูผลการค้นหาสำหรับ "${searchTerm}" บน United 1999 Plus พบสินค้าที่เกี่ยวข้องมากมาย`
        : "สำรวจสินค้าทั้งหมดบน United 1999 Plus ที่มีคุณภาพและราคาดี",
      images: ["https://yourdomain.com/images/default-twitter-image.jpg"],
    },
  };
}

export default async function Page({ searchParams }) {
  const searchTerm = searchParams.search || "";
  const page = parseInt(searchParams.page) || 1;

  const productsData = await fetchProducts(searchTerm, page);

  return (
    <div className="flex flex-col max-w-7xl mx-auto">
      <div className="w-full">
        <ProductList 
          products={productsData.products} 
          searchTerm={searchTerm} 
          totalResults={productsData.totalProducts} 
        />
        <Pagination
          currentPage={productsData.currentPage}
          totalPages={productsData.totalPages}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
}
