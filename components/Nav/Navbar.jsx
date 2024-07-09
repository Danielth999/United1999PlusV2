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

  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 right-0 shadow-md  py-2 bg-white z-50"
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
      >
        {/* container */}
        <div className="max-w-7xl mx-auto px-4">
          {/* content */}
          <div className="flex justify-between items-center">
            {/* logo */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/">
                <Image src={Logo} height={60} width={60} alt="Logo" className='w-auto h-auto' />
              </Link>
            </motion.div>

            {/* Hamburger Menu for small screens */}
            <div className="lg:hidden">
              <HamburgerMenu isOpen={isMenuOpen} toggle={() => setIsMenuOpen(!isMenuOpen)} />
            </div>

            {/* search components */}
            <motion.div 
              className="hidden lg:block flex-1 mx-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <SearchComponent />
            </motion.div>

            {/* contact components */}
            <motion.div 
              className="hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Contact />
            </motion.div>

            {/* admin login */}
            <motion.div 
              className="hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <Admin />
            </motion.div>
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
      </motion.nav>

      {/* Menu component for larger screens */}
      <div className="hidden lg:block mt-[22px]  z-40 fixed top-16 left-0 right-0 bg-white shadow-md">
        <Menu />
      </div>
    </>
  );
};

export default Navbar;
