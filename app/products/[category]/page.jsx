
import ProductList from '../components/ProductList';

async function fetchProducts(category) {
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?category=${category}`);

    // ตรวจสอบสถานะของ response
    if (!res.ok) {
      throw new Error(`An error occurred: ${res.statusText}`);
    }

    // ตรวจสอบว่าข้อมูลที่ได้รับเป็น JSON
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function CategoryPage({ params }) {
  const { category } = params;
  const products = await fetchProducts(category);

  return (
    <div className="flex max-w-7xl mx-auto">
     
      <div className="w-full">
        <ProductList products={products} />
      </div>
    </div>
  );
}
