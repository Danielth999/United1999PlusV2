"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Logo from "@/public/logo/logo.png";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("ยินดีตอนรับ Admin ");
      router.push("/");
    }
  };

  return (
    <>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-xl py-6">
          <header className="text-center">
            <h1 className="mb-2 inline-flex items-center gap-2 text-2xl font-bold">
              <Image src={Logo} width={40} height={40} alt="logo company" />
              <span className="text-[#0571cc]">United 1999 Plus</span>
            </h1>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              ยินดีตอนรับ, กรุณาเข้าสู่ระบบเพื่อเข้าถึงแดชบอร์ดของคุณ
            </h2>
          </header>

          <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="grow p-5 md:px-16 md:py-12">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium">
                    อีเมล
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50"
                    placeholder="กรอกอีเมลของคุณ"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="password" className="text-sm font-medium">
                    รหัสผ่าน
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50"
                    placeholder="กรอกรหัสผ่านของคุณ"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-4 flex items-center justify-end gap-2">
                   
                    <a
                      href="/#"
                      className="inline-block hover:underline text-sm font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      ลืมรหัสผ่าน?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#0571cc] bg-[#0571cc] px-6 py-3 font-semibold leading-6 text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400/50 active:border-blue-700 active:bg-blue-700 dark:focus:ring-blue-400/90"
                  >
                    <svg
                      className="hi-mini hi-arrow-uturn-right inline-block size-5 opacity-50"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>เข้าสู่ระบบ</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
