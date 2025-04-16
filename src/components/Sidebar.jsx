import {
  Users,
  FileText,
  LayoutDashboard,
  UserCog,
  Tag,
  Archive,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const navItems = [
  { name: "Inicio", icon: LayoutDashboard, href: "/" },
  { name: "Usuarios", icon: Users, href: "/users" },
  { name: "Roles", icon: UserCog, href: "/roles" },
  { name: "Áreas", icon: Tag, href: "/areas" },
  { name: "Publicaciones", icon: FileText, href: "/posts" },
  { name: "Tipos de publicaciones", icon: Archive, href: "/post-types" },
];

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      } bg-gray-800 h-screen`}
    >
      {
        <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-500">
          <button
            className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit text-white"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={24} color="white" />
          </button>
          <nav className="mt-8 flex-grow">
            {navItems.map((item, index) => (
              <Link key={index} to={item.href}>
                <div className="flex items-center p-4 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                  <item.icon
                    size={20}
                    style={{ color: "white", minWidth: "20px" }}
                  />
                  <span
                    className={`ml-4 whitespace-nowrap transition-opacity duration-300 ${
                      isSidebarOpen ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      }
    </div>
  );
};
