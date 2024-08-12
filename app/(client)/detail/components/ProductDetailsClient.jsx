'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetailsClient = ({ product }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageClick = (imageUrl) => setPreviewImage(imageUrl);
  const closePreview = () => setPreviewImage(null);

  const dropIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.1 } },
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Breadcrumb category={product.Category.name} link={product.Category.nameSlug}  name={product.name} />
      <div className="md:flex items-start justify-center border shadow-lg rounded-lg p-4 md:p-6 lg:p-16">
        <ProductImage 
          src={product.imageUrl} 
          alt={product.name} 
          onClick={() => handleImageClick(product.imageUrl)}
        />
        <ProductDetails product={product} />
        <ImagePreviewModal 
          isOpen={!!previewImage} 
          imageUrl={previewImage} 
          onClose={closePreview}
          variants={dropIn}
        />
      </div>
    </div>
  );
};

const Breadcrumb = ({ category, name,link }) => (
  <nav className="flex text-gray-700 text-sm mb-2">
    <Link href="/" className="hover:underline">หน้าหลัก</Link>
    <span className="mx-2">/</span>
    <Link href={`/products/${link}`} className="hover:underline">{category}</Link>
    <span className="mx-2">/</span>
    <span>{name}</span>
  </nav>
);
const ProductImage = ({ src, alt, onClick }) => (
  <>
    <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden  ">
      <Image
        className="w-full rounded-lg shadow-lg cursor-pointer"
        alt={alt}
        src={src}
        width={500}
        height={500}
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onClick={onClick}
      />
    </div>
    <div className="md:hidden">
      <Image
        className="w-full rounded-lg shadow-md cursor-pointer"
        alt={alt}
        src={src}
        width={500}
        height={500}
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onClick={onClick}
      />
    </div>
  </>
);

const ProductDetails = ({ product }) => (
  <div className="xl:w-3/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6 ">
    <ProductHeader category={product.Category.name} name={product.name} />
    <ProductAttribute label="สี" value={product.color} />
    <ProductAttribute label="ขนาด" value={product.size} />
    <ProductAttribute label="จำนวน" value={product.stock} />
    <ProductDescription description={product.description} />
  </div>
);

const ProductHeader = ({ category, name }) => (
  <div className="border-b border-gray-200 pb-6">
    <p className="text-sm leading-none text-gray-600">{category}</p>
    <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2">
      {name}
    </h1>
  </div>
);

const ProductAttribute = ({ label, value }) => (
  <div className="py-4 border-b border-gray-200 flex items-center justify-between">
    <p className="text-base leading-4 text-gray-800">{label}</p>
    <div className="flex items-center justify-center">
      <p className="text-sm leading-none text-gray-600">{value}</p>
    </div>
  </div>
);

const ProductDescription = ({ description }) => (
  <div className="mt-7">
    <p className="w-full text-base leading-normal lg:leading-tight text-gray-600 overflow-y-auto max-h-[calc(1.5em*5)] pr-2">
      {description}
    </p>
  </div>
);

const ImagePreviewModal = ({ isOpen, imageUrl, onClose, variants }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        onClick={onClose}
      >
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            className="absolute top-4 right-4 bg-white text-black px-2 py-1 border-2 border-black rounded-full shadow-lg"
            onClick={onClose}
          >
            ✕
          </button>
          <Image
            src={imageUrl}
            alt="Preview"
            width={600}
            height={600}
            className="rounded-lg shadow-lg"
            priority
          />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ProductDetailsClient;