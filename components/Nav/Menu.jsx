'use client'
import { usePathname } from 'next/navigation';
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineDropbox, AiOutlineBook, AiOutlineInfoCircle } from 'react-icons/ai';
import { AiOutlineClear } from "react-icons/ai";
import Link from "next/link";
import { motion } from 'framer-motion';
import styles from './Menu.module.css';

const Menu = () => {
  const pathname = usePathname();
  
  const menuItems = [
    { href: "/", icon: AiOutlineHome, label: "หน้าหลัก" },
    { href: "/products", icon: AiOutlineShoppingCart, label: "สินค้าทั้งหมด" },
    { href: "/products/packaging", icon: AiOutlineDropbox, label: "บรรจุภัณฑ์เฟสท์" },
    { href: "/products/office-supplies", icon: AiOutlineBook, label: "อุปกรณ์สำนักงาน" },
    { href: "/products/cleaning-products", icon: AiOutlineClear, label: "ผลิตภัณฑ์ทำความสะอาด" },
    { href: "/about", icon: AiOutlineInfoCircle, label: "เกี่ยวกับเรา" },
  ];

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full lg:bg-gray-100 ">
      <div className="max-w-7xl mx-auto">
        <ul className="flex flex-col lg:flex-row w-full lg:justify-around">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <motion.li 
                key={item.href} 
                className={`${styles.menuItem} ${isActive ? styles.active : ''}`}
                initial="hidden"
                animate="visible"
                variants={menuItemVariants}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={item.href} passHref>
                  <div className={`${styles.menuLink} ${isActive ? 'text-blue-600' : 'text-[#0571cc]'}`}>
                    <Icon className={styles.icon} />
                    <span className={`${styles.label} ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>{item.label}</span>
                  </div>
                </Link>
                <div className={styles.menuBorder}></div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
