// hooks/useSchools.ts
import { useEffect, useState } from "react";
import { getSchools } from "../services/school.service";

export const useSchools = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const res = await getSchools();
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return { data, loading, fetchSchools };
};