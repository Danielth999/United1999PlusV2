import ProductCard from "./ProductCard";
import Link from "next/link";

const ProductList = ({ products, searchTerm }) => {
  return (
    <div className="flex flex-col">
      {searchTerm && (
        <div className="px-4 py-2 text-gray-600">
          ผลการค้นหา <span className="text-red-500">&apos; {searchTerm} &apos;</span>  ({products.length})
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <Link
            key={product.productId}
            href={`/detail/${product.name}?id=${product.productId}`}
          >
            <ProductCard key={product.productId} product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
