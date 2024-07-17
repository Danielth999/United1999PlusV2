'use client'
import { useState, useEffect } from "react";
import ProductTable from "./ProductTable";
import ProductFilter from "./ProductFilter";
import Loading from "@/components/common/Loading"; // นำเข้าคอมโพเนนต์ Loading
import { fetchProducts } from "@/utils/products/fetchProducts"; // นำเข้าฟังก์ชัน fetchProducts

const ProductList = ({ products, currentPage, totalPages, categories, totalProducts, search, category, sortOrder }) => {
  const [filteredProducts, setFilteredProducts] = useState(products); // กำหนดสถานะของสินค้าที่กรองแล้ว
  const [searchTerm, setSearchTerm] = useState(search); // กำหนดสถานะคำค้นหา
  const [selectedCategory, setSelectedCategory] = useState(category); // กำหนดสถานะหมวดหมู่ที่เลือก
  const [currentSortOrder, setCurrentSortOrder] = useState(sortOrder); // กำหนดสถานะการเรียงลำดับปัจจุบัน
  const [currentProductPage, setCurrentProductPage] = useState(currentPage); // กำหนดสถานะหน้าปัจจุบันของสินค้า
  const [totalProductPages, setTotalProductPages] = useState(totalPages); // กำหนดสถานะจำนวนหน้าทั้งหมด
  const [totalProductCount, setTotalProductCount] = useState(totalProducts); // กำหนดสถานะจำนวนสินค้าทั้งหมด
  const [loading, setLoading] = useState(false); // กำหนดสถานะการโหลด

  useEffect(() => {
    setFilteredProducts(products); // อัปเดตสินค้าที่กรองแล้วเมื่อสินค้าที่ส่งมาเปลี่ยนแปลง
    setCurrentProductPage(currentPage); // อัปเดตหน้าปัจจุบันเมื่อหน้าที่ส่งมาเปลี่ยนแปลง
  }, [products, currentPage]);

  const filterProducts = async (term, categoryId, order) => {
    setLoading(true); // เริ่มการโหลด
    setCurrentProductPage(1); // รีเซ็ตหน้าไปที่หน้าแรก
    const res = await fetchProducts(1, term, categoryId, order); // เรียกใช้ฟังก์ชัน fetchProducts
    setFilteredProducts(res.products); // อัปเดตสินค้าที่กรองแล้ว
    setTotalProductPages(res.totalPages); // อัปเดตจำนวนหน้าทั้งหมด
    setTotalProductCount(res.totalProducts); // อัปเดตจำนวนสินค้าทั้งหมด
    setLoading(false); // หยุดการโหลด
  };

  const handleSearch = (term) => {
    setSearchTerm(term); // อัปเดตคำค้นหา
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId); // อัปเดตหมวดหมู่ที่เลือก
  };

  const handleSortChange = (order) => {
    setCurrentSortOrder(order); // อัปเดตการเรียงลำดับปัจจุบัน
  };

  const handlePageChange = async (page) => {
    setLoading(true); // เริ่มการโหลด
    setCurrentProductPage(page); // อัปเดตหน้าปัจจุบัน
    const res = await fetchProducts(page, searchTerm, selectedCategory, currentSortOrder); // เรียกใช้ฟังก์ชัน fetchProducts
    setFilteredProducts(res.products); // อัปเดตสินค้าที่กรองแล้ว
    setTotalProductPages(res.totalPages); // อัปเดตจำนวนหน้าทั้งหมด
    setTotalProductCount(res.totalProducts); // อัปเดตจำนวนสินค้าทั้งหมด
    setLoading(false); // หยุดการโหลด
  };

  const handleDelete = (productId) => {
    setFilteredProducts(filteredProducts.filter(product => product.productId !== productId)); // กรองสินค้าที่ถูกลบออก
    setTotalProductCount(totalProductCount - 1); // ลดจำนวนสินค้าทั้งหมด
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
          onDelete={handleDelete} // เพิ่ม props สำหรับการลบสินค้า
        />
      )}
    </div>
  );
};

export default ProductList;
