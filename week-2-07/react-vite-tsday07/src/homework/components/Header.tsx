import { FaBell, FaSearch, FaPlus } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="flex items-center justify-between pb-4 border-b bg-white">
      <div className="flex items-center gap-2">
        <div className="bg-blue-500 text-white rounded-md p-1">
          <FaPlus size={16} />
        </div>
        <span className="text-xl font-semibold">H-care</span>
      </div>

      <div className="hidden md:block flex-1 px-6">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <FaBell className="text-xl text-gray-600" />
        <div className="w-8 h-8 rounded-full bg-gray-300" />
        <span className="text-sm font-medium text-gray-700">Emma Kwan</span>
      </div>
    </header>
  );
};

export default Header;
