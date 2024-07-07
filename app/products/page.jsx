import ProductList from "./components/ProductList";

async function fetchProducts(searchTerm = "") {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/products?search=${encodeURIComponent(searchTerm)}`
    );

    if (!res.ok) {
      throw new Error(`An error occurred: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function Page({ searchParams }) {
  const searchTerm = searchParams.search || "";
  const products = await fetchProducts(searchTerm);

  return (
    <div className="flex flex-col max-w-7xl mx-auto">
      <div className="w-full mt-4">
        <ProductList products={products} searchTerm={searchTerm} />
      </div>
    </div>
  );
}
