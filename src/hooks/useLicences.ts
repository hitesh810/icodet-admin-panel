// hooks/useLicences.ts
import { useEffect, useState } from "react";
import { getLicences } from "../services/licence.service";

export const useLicences = (filters: any) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const fetchLicences = async () => {
    setLoading(true);
    try {
      const res = await getLicences(filters);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLicences();
  }, [filters]);

  return { data, loading, fetchLicences };
};