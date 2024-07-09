'use client'
import React, { useCallback } from "react";
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = ({ images }) => {
  const swiperOptions = useCallback(
    () => ({
      modules: [Navigation, Pagination, Autoplay],
      spaceBetween: 10,
      slidesPerView: 1,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: { clickable: true },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loop: true,
    }),
    []
  );

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="w-full max-w-7xl mx-auto  overflow-hidden "
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Swiper {...swiperOptions()}>
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="relative w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px] overflow-hidden"
              variants={itemVariants}
            >
              <Image
                src={image.url}
                alt={`Slide ${index + 1}`}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </motion.div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          background: none;
          color: black;
        }
        .swiper-button-prev::after,
        .swiper-button-next::after {
          display: none;
        }
      `}</style>
    </motion.div>
  );
};

export default Carousel;
