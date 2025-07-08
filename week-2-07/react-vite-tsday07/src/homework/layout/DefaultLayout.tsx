import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function DefaultLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Main content */}
        <main
          className={`flex-1 overflow-y-auto p-6 transition-opacity duration-300 md:opacity-100 ${
            isOpen ? 'opacity-20 pointer-events-none md:pointer-events-auto md:opacity-100' : ''
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
