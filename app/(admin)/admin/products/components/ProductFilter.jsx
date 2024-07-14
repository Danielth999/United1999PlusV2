"use client";
import { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import Link from "next/link";

const ProductFilter = ({ categories, onSearch, onCategoryChange, onSortChange, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [hasChanges, setHasChanges] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setHasChanges(true);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setHasChanges(true);
  };

  const handleSortChange = () => {
    const newSortOrder = sortOrder === "newest" ? "oldest" : "newest";
    setSortOrder(newSortOrder);
    setHasChanges(true);
  };

  const handleFilter = () => {
    onFilter(searchTerm, selectedCategory, sortOrder);
    setHasChanges(false); // Reset the changes state after applying filters
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && hasChanges) {
      handleFilter();
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [searchTerm, selectedCategory, sortOrder, hasChanges]);

  return (
    <div className="flex items-center justify-between space-x-4 mb-2">

      <Link href={'/admin/products/add-product'} className="px-4 py-2 bg-green-500 text-white rounded flex items-center">
        <FaPlus className="mr-2" /> เพิ่มสินค้า
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
          className={`px-4 py-2 ${hasChanges ? 'bg-yellow-500' : 'bg-gray-500'} text-white rounded`}
          disabled={!hasChanges}
        >
          ยืนยัน
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
