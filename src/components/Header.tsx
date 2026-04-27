// components/common/Header.tsx
import { Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const pageName = location.pathname.split("/")[1] || "dashboard";

  return (
    <div className="bg-white shadow px-6 py-3 flex justify-between items-center">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button onClick={() => setCollapsed(!collapsed)}>
          <Menu size={20} />
        </button>

        <span className="text-gray-600 capitalize">
          Dashboard / {pageName}
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <input
          placeholder="Search..."
          className="border px-3 py-1 rounded-md text-sm"
        />

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;