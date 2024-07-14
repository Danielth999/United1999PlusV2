'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { FaHome, FaUsers, FaBox, FaTag, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { HiOutlinePhotograph } from 'react-icons/hi';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { href: '/admin', icon: FaHome, label: 'แดชบอร์ด' },
    { href: '/admin/carousel', icon: HiOutlinePhotograph, label: 'แบนเนอร์' },
    { href: '/admin/users', icon: FaUsers, label: 'ผู้ใช้' },
    { href: '/admin/products', icon: FaBox, label: 'สินค้า' },
    { href: '/admin/category', icon: FaTag, label: 'หมวดหมู่' },
  ];

  return (
    <div className={`flex ${isExpanded ? 'w-64' : 'w-20'} bg-gray-800 text-white min-h-screen flex-col transition-width duration-300`}>
      <div className={`p-4 flex ${isExpanded ? 'justify-between' : 'justify-center'} items-center`}>
        <Link href="/" key="home-link">
          <span className={`text-2xl font-bold ${!isExpanded ? 'hidden' : ''}`}>
            United 1999 Plus
          </span>
        </Link>
        <button onClick={toggleSidebar} className="text-xl focus:outline-none">
          <FaBars />
        </button>
      </div>
      <nav className="mt-4 flex-grow">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${pathname === item.href ? 'bg-blue-500' : ''}`}>
              <item.icon className={`${isExpanded ? 'mr-3' : 'mx-auto'}`} />
              {isExpanded && <span className="text-xl">{item.label}</span>}
            </div>
          </Link>
        ))}
        <div
          className="flex items-center py-2.5 px-4 text-red-500 rounded transition duration-200 hover:bg-gray-700 cursor-pointer"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <FaSignOutAlt className={`${isExpanded ? 'mr-3' : 'mx-auto'}`} />
          {isExpanded && <span className="text-xl">ออกจากระบบ</span>}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
