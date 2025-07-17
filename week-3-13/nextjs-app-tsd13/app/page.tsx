import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";

interface Product { id: number; title: string; images: string[]; price: number; };


async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=20");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <Hero />
      <div className="p-6 mx-18">
        <h2 className="text-2xl font-bold mb-4">Sản phẩm bán chạy</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <Link key={product.id} href={`/shop/product/${product.id}`}>
              <div className="bg-white rounded-lg trasition-shadow hover:shadow-lg shadow-md duration-300 overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={product.images[0] || "/placeholder.svg?height=300&width=300"}
                    alt={product.title}
                    fill
                    className="object-cover"
                    crossOrigin="anonymous"
                    placeholder="empty"
                  />
                </div>
                <h3 className="text-lg font-semibold mt-2 px-2">{product.title}</h3>
                <p className="text-red-500 font-bold mt-1 px-2">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>

  );
}
