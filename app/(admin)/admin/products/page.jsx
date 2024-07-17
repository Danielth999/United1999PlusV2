import ProductList from "./components/ProductList";
import { fetchProducts, fetchCategories } from "@/utils/products/fetchProducts";

export default async function AdminProductPage({ searchParams }) {
  const page = parseInt(searchParams.page, 10) || 1;
  const search = searchParams.search || "";
  const category = searchParams.category || "";
  const sortOrder = searchParams.sortOrder || "newest";

  const { products, totalProducts, currentPage, totalPages } =
    await fetchProducts(page, search, category, sortOrder);
  const categories = await fetchCategories();

  return (
    <div>
      <ProductList
        products={products}
        totalProducts={totalProducts}
        currentPage={currentPage}
        totalPages={totalPages}
        categories={categories}
        search={search}
        category={category}
        sortOrder={sortOrder}
      />
    </div>
  );
}
