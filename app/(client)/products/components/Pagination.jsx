'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, searchTerm }) => {
  const createPageUrl = (page) => {
    const params = new URLSearchParams();
    params.set('page', page);
    if (searchTerm) params.set('search', searchTerm);
    return `?${params.toString()}`;
  };

  return (
    <nav className="flex justify-center items-center space-x-4 mt-8">
      <Link
        href={createPageUrl(currentPage - 1)}
        className={`flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-blue-600 hover:bg-blue-600 hover:text-white shadow-md hover:shadow-lg border border-blue-300"
        }`}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        ก่อนหน้า
      </Link>
      
      <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-full shadow-inner border border-gray-200">
        หน้า {currentPage} จาก {totalPages}
      </span>
      
      <Link
        href={createPageUrl(currentPage + 1)}
        className={`flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-blue-600 hover:bg-blue-600 hover:text-white shadow-md hover:shadow-lg border border-blue-300"
        }`}
        aria-disabled={currentPage === totalPages}
      >
        ถัดไป
        <ChevronRight className="w-5 h-5 ml-2" />
      </Link>
    </nav>
  );
};

export default Pagination;