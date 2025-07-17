import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import React from "react";
import { Home, ListTodo } from "lucide-react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Home size={20} /> Dashboard
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-6 border-r">
          <nav className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-gray-700">Menu</h2>

            <Link
              href="/dashboard/task-server"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              <ListTodo className="inline-block mr-2" size={18} />
              Tasks Server Component
            </Link>

            <Link
              href="/dashboard/task-client"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              <ListTodo className="inline-block mr-2" size={18} />
              Tasks Client Component
            </Link>

            <div className="mt-6">
              <LogoutButton />
            </div>
          </nav>
        </aside>

        {/* Content */}
        <section className="flex-1 bg-white p-6 rounded-lg shadow-md m-4">
          {children}
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
