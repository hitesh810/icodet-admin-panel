import { Home, Users, Settings } from "lucide-react";

const MiniSidebar = () => {
  return (
    <div className="w-16 bg-white border-r flex flex-col items-center py-4 gap-6">
      <Home className="text-gray-500 hover:text-indigo-600 cursor-pointer" />
      <Users className="text-gray-500 hover:text-indigo-600 cursor-pointer" />
      <Settings className="text-gray-500 hover:text-indigo-600 cursor-pointer" />
    </div>
  );
};

export default MiniSidebar;