import React from "react";
import { RiAdminFill } from "react-icons/ri";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserProfile = () => {
  const { data: session, status } = useSession();

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  return (
    status === "authenticated" && session ? (
      <div className="flex items-center space-x-4 ml-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center cursor-pointer space-x-2 bg-[#dee4f0] rounded-full px-2 py-1">
              <div className="w-8 h-8 bg-blue-700 text-white flex items-center justify-center rounded-full">
                {session.user.username &&
                  session.user.username[0].toUpperCase()}
              </div>
              <div className="text-[#204d9c] font-medium overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[100px]">
                {session.user.username}
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {session.user.role === "admin" && (
              <DropdownMenuItem>
                <Link href="/admin">ระบบจัดการ</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <button onClick={() => signOut()} className="text-red-500">
                ออกจากระบบ
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ) : (
      <div className="ml-2">
        <Link href="/login">
          <button className="inline-flex items-center bg-[#0571cc] text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out">
            <RiAdminFill className="mr-2" size={24} />
            Admin
          </button>
        </Link>
      </div>
    )
  );
};

export default UserProfile;