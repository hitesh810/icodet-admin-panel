// layouts/AppLayout.tsx
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar collapsed={collapsed} />

      <div className="flex-1 flex flex-col">
        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <main className="p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;