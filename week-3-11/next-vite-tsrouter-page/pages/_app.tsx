import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = router.pathname;

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    { href: '/products', label: 'Product' },
    { href: '/login', label: 'Login' },
  ];
  return (
    <div>
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">MyApp</div>
          <div className="space-x-4">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`transition ${
                  pathname === href
                    ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="p-6">
        <Component {...pageProps} />
      </main>
    </div>
  )  ;
}
