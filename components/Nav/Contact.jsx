import { FaLine, FaFacebook, FaTiktok } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import Link from "next/link";

const Contact = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 lg:gap-4 border-r border-gray-300 pr-2">
        <Link target="_blank" href="/contact">
          <button className="border border-[#0571cc] text-[#0571cc] bg-white rounded-full flex items-center justify-center px-3 py-2 lg:px-4 lg:py-2 hover:bg-[#0571cc] hover:text-white transition duration-300 ease-in-out">
            <MdOutlineMessage size={20} className="mr-1 lg:mr-2" />
            <span className="text-xs lg:text-base">ติดต่อเรา</span>
          </button>
        </Link>
      </div>
      <div className="flex  items-center gap-2 lg:gap-4">
        <ul className="flex items-center gap-2 lg:gap-4">
          <li>
            <Link target="_blank" 
              href="mailto:united.sale.ry@gmail.com?subject=สอบถามข้อมูลเพิ่มเติม&body=สวัสดีครับ/ค่ะ%0D%0A%0D%0Aขอสอบถามข้อมูลเพิ่มเติมเกี่ยวกับสินค้าของทางร้าน%0D%0A%0D%0Aขอบคุณครับ/ค่ะ"
            
            >
              <button className="bg-[#1DA1F2] rounded-full w-8 h-8 p-1 lg:w-10 lg:h-10 lg:p-2 flex items-center justify-center text-white transition duration-300 ease-in-out hover:bg-[#1A91DA]">
                <IoIosMail size={16} className="lg:size-24" />
              </button>
            </Link>
          </li>
          <li>
            <Link target="_blank" href="https://web.facebook.com/unitedry">
              <button className="bg-[#3b5998] rounded-full w-8 h-8 p-1 lg:w-10 lg:h-10 lg:p-2 flex items-center justify-center text-white transition duration-300 ease-in-out hover:bg-[#334d84]">
                <FaFacebook size={16} className="lg:size-24" />
              </button>
            </Link>
          </li>
          <li>
            <Link target="_blank" href="/contact">
              <button className="bg-[#00c300] rounded-full w-8 h-8 p-1 lg:w-10 lg:h-10 lg:p-2 flex items-center justify-center text-white transition duration-300 ease-in-out hover:bg-[#00a300]">
                <FaLine size={16} className="lg:size-24" />
              </button>
            </Link>
          </li>
          <li className="border-x border-gray-300 px-2">
            <Link target="_blank" href="https://www.tiktok.com/@dshop1999?is_from_webapp=1&sender_device=pc">
              <button className="flex items-center bg-white border border-[#0571cc] hover:border-black hover:bg-[#010101] rounded-full px-3 py-2 lg:px-4 lg:py-2 text-[#0571cc] hover:text-white transition duration-300 ease-in-out">
                <FaTiktok size={16} className="mr-1 lg:mr-2 " />
                <span className="text-xs lg:text-base">สั่งซื้อสินค้า</span>
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
