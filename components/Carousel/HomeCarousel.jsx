"use client"; // ระบุว่าโค้ดนี้เป็น Client-side code
import React, { useRef } from "react"; // นำเข้า React และ useRef hook
import Autoplay from "embla-carousel-autoplay"; // นำเข้า Autoplay plugin สำหรับ Embla Carousel
import Image from "next/image"; // นำเข้า Image component ของ Next.js
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselIndicators,
} from "@/components/ui/carousel"; // นำเข้า components ที่จำเป็นสำหรับ Carousel

export default function HomeCarousel({ images }) {
  // ใช้ useRef เพื่อสร้าง ref สำหรับ Autoplay plugin
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  return (
    // สร้าง Carousel component พร้อมตั้งค่า plugin และขนาดของ carousel
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-4xl mx-auto mt-4" // ตั้งค่าขนาดของ carousel ให้เต็มความกว้างและมีขนาดสูงสุดที่ 4xl, จัดกึ่งกลางด้วย mx-auto, และมี margin-top ที่ 4
    >
      <CarouselContent className="w-full "> {/* ตั้งค่าเนื้อหาของ carousel */}
        {images.map((image, index) => ( // สร้าง CarouselItem ตามจำนวนรูปภาพที่ได้รับจาก props
          <CarouselItem key={image.id} className="w-full "> {/* ตั้งค่า item ของ carousel */}
            <div className="p-1 w-full"> {/* กำหนด padding และขนาดเต็ม */}
              <div className="relative w-full h-96 overflow-hidden rounded-lg"> {/* กำหนด flex layout, จัดกึ่งกลางทั้งแนวนอนและแนวตั้ง, และทำให้ภาพเป็นขนาดเต็ม */}
                <Image
                  src={image.url} // ใช้ URL ของรูปภาพจาก props
                  alt={`Slide ${index + 1}`}
                  fill // ใช้ layout fill เพื่อให้ภาพครอบคลุมพื้นที่ทั้งหมดของ container
                 
                  className="rounded-lg object-cover" // เพิ่ม class เพื่อทำให้ภาพมีขอบมน
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselIndicators /> {/* เพิ่ม indicators สำหรับ carousel */}
    </Carousel>
  );
}
