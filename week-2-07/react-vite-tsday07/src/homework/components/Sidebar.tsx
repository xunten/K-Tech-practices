
import { NavLink } from 'react-router-dom';
import { FaBars, FaUserFriends, FaChartBar, FaMap, FaBuilding, FaUserMd, FaHistory, FaCog, FaTimes } from 'react-icons/fa';
import type { FC } from 'react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}
const menuItems = [
  { name: 'Patients', path: '/', icon: <FaUserFriends /> },
  { name: 'Overview', path: '/overview', icon: <FaChartBar /> },
  { name: 'Map', path: '/map', icon: <FaMap /> },
  { name: 'Departments', path: '/departments', icon: <FaBuilding /> },
  { name: 'Doctors', path: '/doctors', icon: <FaUserMd /> },
  { name: 'History', path: '/history', icon: <FaHistory /> },
  { name: 'Settings', path: '/settings', icon: <FaCog /> },
];

const Sidebar: FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <div className="md:hidden py-4 pr-4">
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl ml-4">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-[72px] left-0 h-[calc(100%-64px)] w-64 bg-white shadow-md border-r z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:static md:translate-x-0 md:h-full`}
      >
        <nav className="flex flex-col gap-2 py-4 pr-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded transition ${
                  isActive
                    ? 'bg-blue-100 text-blue-600 border border-blue-300'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
