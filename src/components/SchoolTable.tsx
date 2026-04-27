// components/SchoolTable.tsx
import { useNavigate } from "react-router-dom";

const SchoolTable = ({ data }: any) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="p-3 text-left">School Name</th>
            <th className="p-3 text-left">Username</th>
            <th className="p-3 text-left">Created At</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((school: any) => (
            <tr
              key={school.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-3 font-medium">
                {school.name}
              </td>

              <td className="p-3">{school.username}</td>

              <td className="p-3 text-gray-500">
                {new Date(school.created_at).toLocaleDateString()}
              </td>

              <td className="p-3">
                <button
                  onClick={() =>
                    navigate(`/licences?school_id=${school.id}`)
                  }
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Licences
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolTable;