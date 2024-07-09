// 'use client'

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const SidebarItem = ({ href, icon, children, isExpanded }) => {
//   const pathname = usePathname();
//   const isActive = pathname === href;

//   return (
//     <Link href={href} className={`flex items-center p-4 ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
//       <span className={`mr-2 ${isExpanded ? '' : 'mx-auto'}`}>
//         {/* Add icon component based on 'icon' prop */}
//         {icon}
//       </span>
//       {isExpanded && children}
//     </Link>
//   );
// };

// export default SidebarItem;