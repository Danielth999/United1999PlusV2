import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";

// Fetch products on the server-side
async function fetchProducts(searchTerm = "", page = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?search=${encodeURIComponent(searchTerm)}&page=${page}&limit=20`
     // This ensures no caching to get fresh data on each request
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