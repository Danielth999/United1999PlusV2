'use client'
import { useState, useEffect } from "react";
import ProductTable from "./ProductTable";
import ProductFilter from "./ProductFilter";
import Loading from "@/components/common/Loading"; // นำเข้าคอมโพเนนต์ Loading
import { fetchProducts } from "@/utils/fetchProducts"; // นำเข้าฟังก์ชัน fetchProducts

const ProductList = ({ products, currentPage, totalPages, categories, totalProducts, search, category, sortOrder }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState(search);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [currentSortOrder, setCurrentSortOrder] = useState(sortOrder);
  const [currentProductPage, setCurrentProductPage] = useState(currentPage);
  const [totalProductPages, setTotalProductPages] = useState(totalPages);
  const [totalProductCount, setTotalProductCount] = useState(totalProducts);
  const [loading, setLoading] = useState(false); // เพิ่มสถานะ loading

  useEffect(() => {
    setFilteredProducts(products);
    setCurrentProductPage(currentPage);
  }, [products, currentPage]);

  const filterProducts = async (term, categoryId, order) => {
    setLoading(true); // เริ่มการโหลด
    setCurrentProductPage(1); // รีเซ็ตหน้าไปที่หน้าแรก
    const res = await fetchProducts(1, term, categoryId, order);
    setFilteredProducts(res.products);
    setTotalProductPages(res.totalPages);
    setTotalProductCount(res.totalProducts);
    setLoading(false); // หยุดการโหลด
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSortChange = (order) => {
    setCurrentSortOrder(order);
  };

  const handlePageChange = async (page) => {
    setLoading(true); // เริ่มการโหลด
    setCurrentProductPage(page);
    const res = await fetchProducts(page, searchTerm, selectedCategory, currentSortOrder);
    setFilteredProducts(res.products);
    setTotalProductPages(res.totalPages);
    setTotalProductCount(res.totalProducts);
    setLoading(false); // หยุดการโหลด
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">หน้าระบบจัดการสินค้า</h1>
      <ProductFilter
        categories={categories}
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onFilter={filterProducts}
        search={searchTerm}
        category={selectedCategory}
        sortOrder={currentSortOrder}
      />
      {loading ? (
        <Loading /> // แสดงคอมโพเนนต์ Loading ระหว่างการโหลด
      ) : (
        <ProductTable
          products={filteredProducts}
          currentPage={currentProductPage}
          totalPages={totalProductPages}
          searchTerm={searchTerm}
          totalProducts={totalProductCount}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductList;
