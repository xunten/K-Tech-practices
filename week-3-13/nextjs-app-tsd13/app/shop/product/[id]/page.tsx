import { ArrowLeft } from "lucide-react";
import Image from "next/image"
import Link from "next/link";

async function getProduct(id: string) {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
    if (!res.ok) {
        throw new Error("Failed to fetch product")
    }
    return res.json()
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: paramId } = await params;
    const id = (paramId);
    const product = await getProduct(id)

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại trang chủ
            </Link>
            
            <h2 className="text-3xl font-bold mb-6">Chi tiết sản phẩm</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Hình ảnh sản phẩm */}
                <div className="aspect-square relative">
                    <Image
                        src={product.images[0] || "/placeholder.svg?height=500&width=500"}
                        alt={product.title}
                        fill
                        className="object-cover"
                        crossOrigin="anonymous"
                    />
                </div>

                {/* Thông tin sản phẩm */}
                <div>
                    <h3 className="text-2xl font-semibold mb-2">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    <p className="text-xl font-bold text-red-600 mb-2">${product.price}</p>

                    {product.category?.name && (
                        <p className="text-sm text-gray-500">
                            Danh mục: <span className="font-medium">{product.category.name}</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}