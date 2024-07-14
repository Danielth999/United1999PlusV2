import AddProduct from "../components/AddProduct";
import { fetchCategories } from "@/utils/fetchProducts";
export default async function AddProductPage() {
  const categories =  await fetchCategories();
  return (
    <>
      <AddProduct categories={categories} />
    </>
  );
}
