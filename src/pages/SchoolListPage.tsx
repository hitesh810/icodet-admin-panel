// pages/SchoolListPage.tsx
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { useSchools } from "../hooks/useSchools";
import SchoolTable from "../components/SchoolTable";

const SchoolListPage = () => {
  const navigate = useNavigate();
  const { data, loading } = useSchools();

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Schools</h1>

        <button
          onClick={() => navigate("/schools/create")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          + Create School
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <SchoolTable data={data} />
      )}
    </AppLayout>
  );
};

export default SchoolListPage;