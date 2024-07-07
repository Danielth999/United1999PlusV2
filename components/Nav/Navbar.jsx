'use client'
import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import Logo from "@/public/logo/logo.png"; // อ้างอิงโลโก้ที่ถูกต้อง
// components
import Contact from "./Contact";
import SearchComponent from "./Search"; // เปลี่ยนชื่อให้ตรงกัน
import Admin from "./Admin";
import HamburgerMenu from "../common/HamburgerMenu";
import Menu from "./Menu"; // นำเข้า Menu component

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="shadow-md py-4 bg-white">
        {/* container */}
        <div className="max-w-7xl mx-auto px-4">
          {/* content */}
          <div className="flex justify-between items-center">
            {/* logo */}
            <div 
              className="flex items-center" 
             
            >
              <Link href="/">
                <Image src={Logo} height={60} width={60} alt="Logo" className='w-auto h-auto' />
              </Link>
            </div>

            {/* Hamburger Menu for small screens */}
            <div className="lg:hidden">
              <HamburgerMenu isOpen={isMenuOpen} toggle={() => setIsMenuOpen(!isMenuOpen)} />
            </div>

            {/* search components */}
            <div 
              className="hidden lg:block flex-1 mx-4"
             
            >
              <SearchComponent />
            </div>

            {/* contact components */}
            <div 
              className="hidden lg:block"
             
            >
              <Contact />
            </div>

            {/* admin login */}
            <div 
              className="hidden lg:block"
            
            >
              <Admin />
            </div>
          </div>

          {/* Responsive Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:hidden mt-4 flex flex-col items-center space-y-4 overflow-hidden"
              >
                <SearchComponent />
                <Contact />
                <Admin />
                <Menu /> {/* Add the Menu component here for mobile */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Menu component for larger screens */}
      <div className="hidden lg:block">
        <Menu />
      </div>
    </>
  );
};

export default Navbar;
