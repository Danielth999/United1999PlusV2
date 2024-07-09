import Link from "next/link";
import ProductCard from "./ProductCard";

const ProductList = ({ products, searchTerm, totalResults }) => {
  return (
    <div className="flex flex-col">
      {searchTerm && (
        <div className="px-4 py-2 text-gray-600">
          ผลการค้นหา <span className="text-red-500">&apos; {searchTerm} &apos;</span> ({totalResults} ผลลัพธ์)
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-2 md:px-0">
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
