'use client';
import { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import Link from "next/link";

const ProductFilter = ({ categories, onSearch, onCategoryChange, onSortChange, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState(""); // สถานะของคำค้นหา
  const [selectedCategory, setSelectedCategory] = useState(""); // สถานะของหมวดหมู่ที่เลือก
  const [sortOrder, setSortOrder] = useState("newest"); // สถานะของการเรียงลำดับ
  const [hasChanges, setHasChanges] = useState(false); // สถานะการเปลี่ยนแปลง

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // อัปเดตคำค้นหา
    setHasChanges(true); // ตั้งค่าสถานะการเปลี่ยนแปลง
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // อัปเดตหมวดหมู่ที่เลือก
    setHasChanges(true); // ตั้งค่าสถานะการเปลี่ยนแปลง
  };

  const handleSortChange = () => {
    const newSortOrder = sortOrder === "newest" ? "oldest" : "newest"; // เปลี่ยนลำดับการเรียง
    setSortOrder(newSortOrder); // อัปเดตการเรียงลำดับ
    setHasChanges(true); // ตั้งค่าสถานะการเปลี่ยนแปลง
  };

  const handleFilter = () => {
    onFilter(searchTerm, selectedCategory, sortOrder); // เรียกใช้ฟังก์ชันกรองสินค้า
    setHasChanges(false); // รีเซ็ตสถานะการเปลี่ยนแปลงหลังจากใช้ตัวกรอง
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && hasChanges) {
      handleFilter(); // เรียกใช้ฟังก์ชันกรองสินค้าด้วยการกด Enter
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress); // เพิ่ม event listener สำหรับ keypress
    return () => {
      document.removeEventListener('keypress', handleKeyPress); // ลบ event listener เมื่อ component ถูก unmount
    };
  }, [searchTerm, selectedCategory, sortOrder, hasChanges]);

  return (
    <div className="flex items-center justify-between space-x-4 mb-2">

      <Link href={'/admin/products/add-product'} className="px-4 py-2 bg-green-500 text-white rounded flex items-center">
        <FaPlus className="mr-2" /> เพิ่มสินค้า {/*ลิงก์ไปยังหน้าการเพิ่มสินค้า */}
      </Link>
      
      <div className="flex items-center space-x-2">
        <div className="flex items-center border rounded">
          <FaSearch className="mx-2" />
          <input
            type="text"
            placeholder="ค้นหา..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border rounded"
        >
          <option value="">ทุกหมวดหมู่</option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleSortChange}
          className="px-4 py-2 bg-blue-500 text-white rounded flex items-center"
        >
          {sortOrder === "newest" ? (
            <FaSortAlphaDown className="mr-2" />
          ) : (
            <FaSortAlphaUp className="mr-2" />
          )}
          {sortOrder === "newest" ? "ใหม่ไปเก่า" : "เก่าไปใหม่"}
        </button>
        <button
          onClick={handleFilter}
          className={`px-4 py-2 ${hasChanges ? 'bg-yellow-500' : 'bg-rose-500'} text-white rounded`}
          disabled={!hasChanges}
        >
        {hasChanges ? 'ยืนยันการเปลี่ยนแปลง' : 'ไม่มีการเปลี่ยนแปลง'}

        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
