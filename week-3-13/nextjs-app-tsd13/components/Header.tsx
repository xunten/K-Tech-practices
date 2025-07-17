'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop/user", label: "User" },
    { href: "/shop/search", label: "Tìm kiếm" },
];

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            {/* Banner */}
            <div className="h-[44px] w-full">
                <Image
                    src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/bd/26/bd260331dfc577627b0c955e027cdaba.png"
                    alt="Banner"
                    className="w-full h-full object-cover"
                    width={1200}
                    height={44}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 1200px"
                    priority={true}
                />
            </div>

            {/* Header */}
            <header className="bg-[#ffd500] shadow-md sticky top-0 z-50">
                <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-gray-800">
                        Shop Online
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
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

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-600 hover:text-blue-600"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-[#ffd500] border-t border-gray-200">
                        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                            {navLinks.map(({ href, label }) => {
                                const isActive = pathname === href;
                                const linkClass = `transition-colors duration-200 ${
                                    isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
                                }`;

                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={linkClass}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
}