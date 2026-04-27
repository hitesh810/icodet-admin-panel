// components/common/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    School,

    KeySquare,
} from "lucide-react";

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
    const location = useLocation();
    const role = localStorage.getItem("role");

    const menu = {
        SUPER_ADMIN: [
            {
                name: "Dashboard",
                path: "/dashboard",
                icon: LayoutDashboard,
            },
            // {
            //     name: "Class & Volume",
            //     path: "/class-volume",
            //     icon: School,
            // },
            {
                name: "Schools",
                path: "/schools",
                icon: School,
            },
            {
                name: "Licences",
                path: "/licences",
                icon: KeySquare,
            },
            {
                name: "Question Bank",
                path: "/question-bank",
                icon: KeySquare,
            },
            {
                name: "Classes",
                path: "/classes",
                icon: KeySquare,

            },
            {
                name: "Volumes",
                path: "/volumes",
                icon: KeySquare,

            }
        ],
        SCHOOL: [
            {
                name: "Dashboard",
                path: "/dashboard",
                icon: LayoutDashboard,
            },
            {
                name: "My Licences",
                path: "/my-licences",
                icon: KeySquare,
            },



        ],
    };

    const items = menu[role as "SUPER_ADMIN" | "SCHOOL"] || [];

    return (
        <div
            className={`${collapsed ? "w-16" : "w-64"
                } bg-white shadow-md transition-all duration-300 flex flex-col`}
        >
            {/* Logo */}
            <div className="p-4 text-lg font-bold">
                {collapsed ? "I" : "iCodeT"}
            </div>

            {/* Menu */}
            <nav className="flex flex-col gap-2 mt-4">
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-lg transition ${isActive
                                ? "bg-green-100 text-green-700"
                                : "hover:bg-gray-100 text-gray-700"
                                }`}
                        >
                            <Icon size={18} />

                            {!collapsed && (
                                <span className="text-sm font-medium">
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default Sidebar;