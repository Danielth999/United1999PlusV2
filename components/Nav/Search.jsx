"use client";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from "next/navigation";

const SearchProduct = ({ className }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form
      className={`${className} items-center h-[70px] flex justify-center`}
      onSubmit={handleSearch}
    >
      <div className="relative w-full max-w-md">
        <input
          type="search"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-full focus:outline-none border-2 px-4 py-2 pr-16 w-full"
          placeholder="ค้นหาสินค้า"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full bg-[#0571cc] hover:bg-[#0461ae] text-white rounded-full flex items-center justify-center px-4"
        >
          <IoIosSearch size={24} />
          <span className="ml-2">ค้นหา</span>
        </button>
      </div>
    </form>
  );
};

export default SearchProduct;
