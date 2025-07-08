import { NavLink } from "react-router-dom"
import { FaCartShopping } from "react-icons/fa6";


export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-3 shadow bg-[#63C8FF]">
 
  <span className="font-bold text-3xl text-white">Magazines</span>

  <nav className="flex items-center space-x-6 font-bold text-white">
    <NavLink to='/' className="hover:underline" style={({ isActive }) => (isActive ? { color: 'black' } : {})}>Home</NavLink>
    <NavLink to="/blog" className="hover:underline" style={({ isActive }) => (isActive ? { color: 'black' } : {})}>Blog</NavLink>
    <NavLink to="/category" className="hover:underline" style={({ isActive }) => (isActive ? { color: 'black' } : {})}>Category</NavLink>
    <NavLink to="/product" className="hover:underline" style={({ isActive }) => (isActive ? { color: 'black' } : {})}>Product</NavLink>
    <NavLink to="/login" className="hover:underline" style={({ isActive }) => (isActive ? { color: 'black' } : {})}>Login</NavLink>
    <NavLink to="/customer" className="hover:underline" style={({ isActive }) => (isActive ? { color: 'black' } : {})}>Customer</NavLink>

    <div className="ml-2 px-2 py-1 flex items-center bg-white rounded">
      <FaCartShopping size={16} className="text-[#63C8FF] mr-1" />
      <span className="text-[#63C8FF]  font-semibold text-sm">0</span>
    </div>
  </nav>
</header>

  )
}