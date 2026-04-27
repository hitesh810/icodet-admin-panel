import { useEffect, useState } from "react";
import {
  getDashboardStats,
  getMonthlyUsage,
  getDistribution,
} from "../services/dashboard.service";

export const useDashboard = () => {
  const [stats, setStats] = useState({
    total_schools: 0,
    total_licences: 0,
    active_licences: 0,
    used_licences: 0,
  });

  const [monthly, setMonthly] = useState<any[]>([]);
  const [distribution, setDistribution] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [statsRes, monthlyRes, distRes] = await Promise.all([
          getDashboardStats(),
          getMonthlyUsage(),
          getDistribution(),
        ]);

        setStats(statsRes.data.data || {});
        setMonthly(monthlyRes.data.data || []);

        const formatted = Object.keys(distRes.data.data || {}).map((key) => ({
          name: key,
          value: distRes.data.data[key],
        }));

        setDistribution(formatted);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return { stats, monthly, distribution, loading };
};