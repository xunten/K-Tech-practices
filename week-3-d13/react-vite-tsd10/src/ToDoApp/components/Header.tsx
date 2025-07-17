import { NavLink, useNavigate } from "react-router-dom"
import { useAuthStore } from "../auth/useAuthStore";
import ButtonWithPermissions from "./ButtonWithPermissions";

export default function Header() {

    const navigate = useNavigate();
    const { logOut } = useAuthStore((state) => state);
    const loggedInUser = useAuthStore((state) => state.loggedInUser);


    return (
        <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 shadow-lg border-b border-blue-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <span className="font-bold text-2xl sm:text-3xl text-white tracking-tight">ToDoApp</span>
                    </div>

                    {loggedInUser && (
                        <div className="hidden md:block">
                            <span className="text-blue-100 font-medium">
                                Hello, <span className="text-white font-semibold">{loggedInUser.email}</span>!
                            </span>
                        </div>
                    )}

                    <nav className="flex items-center space-x-1 sm:space-x-4">
                        <NavLink
                            to="/tasks"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? "bg-white/20 text-white shadow-sm" : "text-blue-100 hover:text-white hover:bg-white/10"
                                }`
                            }
                        >
                            Tasks
                        </NavLink>

                        <NavLink
                            to="/my-task"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? "bg-white/20 text-white shadow-sm" : "text-blue-100 hover:text-white hover:bg-white/10"
                                }`
                            }
                        >
                            My Tasks
                        </NavLink>

                        <ButtonWithPermissions permissions={['Administrators']}>
                            <NavLink
                                to="/create-task"
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? "bg-white/20 text-white shadow-sm" : "text-blue-100 hover:text-white hover:bg-white/10"
                                    }`
                                }
                            >
                                Create Task
                            </NavLink>
                        </ButtonWithPermissions>

                        {!loggedInUser && <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? "bg-white/20 text-white shadow-sm" : "text-blue-100 hover:text-white hover:bg-white/10"
                                }`
                            }
                        >
                            Login
                        </NavLink>}

                        {loggedInUser && (
                        <button
                            onClick={() => {
                                logOut();
                                navigate('/login');
                            }}
                            className="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-blue-700"
                        >
                            Logout
                        </button>
                        )}

                    </nav>
                </div>
            </div>
        </header>
    )
}
