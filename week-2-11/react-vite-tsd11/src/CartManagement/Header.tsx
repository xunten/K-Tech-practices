
import { NavLink } from "react-router-dom"
export default function Header() {
    return (
        <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 shadow-lg border-b border-blue-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <span className="font-bold text-2xl sm:text-3xl text-white tracking-tight">Cart Management</span>
                    </div>
                    <nav className="flex items-center space-x-1 sm:space-x-4">
                        <NavLink to="/"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? "bg-white/20 text-white shadow-sm" : "text-blue-100 hover:text-white hover:bg-white/10"
                                }`
                            }>Product List</NavLink>
                        <NavLink to="/cart"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? "bg-white/20 text-white shadow-sm" : "text-blue-100 hover:text-white hover:bg-white/10"
                                }`
                            }>Cart</NavLink>
                    </nav>
                </div>
            </div>
        </header>
    )
}