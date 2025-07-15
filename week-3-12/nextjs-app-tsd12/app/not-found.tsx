import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-4">
            <h1 className="text-5xl font-bold mb-4 text-red-500">404 - Page Not Found</h1>
            <p className="text-lg mb-6 text-center">The page you are looking for does not exist.</p>
            <Link
                href="/"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
                Go back to the home page
            </Link>
        </div>
    )
}