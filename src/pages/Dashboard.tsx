import AppLayout from "../layouts/AppLayout";
import { useDashboard } from "../hooks/useDashboard";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import StatsCard from "../components/dashboard/StatsCard";
import UsageChart from "../components/dashboard/UsageChart";
import DistributionChart from "../components/dashboard/DistributionChart";

const Dashboard = () => {
  const { stats, monthly, distribution, loading } = useDashboard();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppLayout>
      {/* 🔥 HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Welcome, {user?.role || "Admin"}
          </p>
        </div>

        {/* 🔥 LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* 🔥 LOADING */}
      {loading ? (
        <div className="text-center py-10">Loading dashboard...</div>
      ) : (
        <>
          {/* 🔥 STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard
              title="Schools"
              value={stats?.total_schools || 0}
            />
            <StatsCard
              title="Licences"
              value={stats?.total_licences || 0}
            />
            <StatsCard
              title="Active"
              value={stats?.active_licences || 0}
            />
            <StatsCard
              title="Used"
              value={stats?.used_licences || 0}
            />
          </div>

          {/* 🔥 CHARTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <UsageChart data={monthly || []} />
            <DistributionChart data={distribution || []} />
          </div>

          {/* 🔥 EXTRA PANEL (future expansion) */}
          <div className="bg-white p-6 rounded-2xl shadow mt-6">
            <h3 className="font-semibold mb-2">System Status</h3>
            <p className="text-gray-500 text-sm">
              All systems running normally 🚀
            </p>
          </div>
        </>
      )}
    </AppLayout>
  );
};

export default Dashboard;