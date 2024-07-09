
import ProductList from '../components/ProductList';
import Pagination from "../components/Pagination";
async function fetchProducts(category, page = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?category=${category}&page=${page}&limit=20`
    );

    // ตรวจสอบสถานะของ response
    if (!res.ok) {
      throw new Error(`An error occurred: ${res.statusText}`);
    }

    // ตรวจสอบว่าข้อมูลที่ได้รับเป็น JSON
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return { products: [], totalProducts: 0, currentPage: 1, totalPages: 1 };
  }
}



export default async function CategoryPage({ params, searchParams }) {
  const { category } = params;
  const page = parseInt(searchParams.page) || 1;

  const productsData = await fetchProducts(category, page);

  return (
    <div className="flex flex-col max-w-7xl mx-auto">
      <div className="w-full">
        <ProductList products={productsData.products} />
        <Pagination
          currentPage={productsData.currentPage}
          totalPages={productsData.totalPages}
          category={category}
        />
      </div>
    </div>
  );
}