'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/admin", label: "Home" },
  { href: "/admin/task-csr", label: "Task-CSR" },
  { href: "/admin/task-ssr", label: "Task-SSR" },
  { href: "/admin/task-ssg", label: "Task-SSG" },
  { href: "/admin/task-isg", label: "Task-ISR" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-gray-800">Task Management</div>
        <div className="space-x-6">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            const linkClass = `transition-colors duration-200 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
            }`;

            return (
              <Link key={href} href={href} className={linkClass}>
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
