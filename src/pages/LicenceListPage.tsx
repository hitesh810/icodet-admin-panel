import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { API } from "../services/api";

const LicenceListPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 10;

  const fetchLicences = async () => {
    try {
      const res = await API.get(
        `/admin/licences?page=${page}&limit=${limit}&search=${search}`
      );

      setData(res.data.data.licences);
      setTotal(res.data.data.total);
    } catch {
      alert("Error fetching licences");
    }
  };

  useEffect(() => {
    fetchLicences();
  }, [page]);

  const handleToggle = async (item: any) => {
    try {
      const newStatus =
        item.status === "ACTIVE" ? "DEACTIVATED" : "ACTIVE";

      await API.put("/admin/licences/status", {
        id: item.id,
        status: newStatus,
      });

      fetchLicences();
    } catch {
      alert("Error updating status");
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            Licence Management
          </h1>
        </div>

        {/* SEARCH */}
        <div className="bg-white p-4 rounded-xl shadow flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search licence or name..."
            className="border px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => {
              setPage(1);
              fetchLicences();
            }}
            className="bg-blue-600 text-white px-5 rounded-lg"
          >
            Search
          </button>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full text-sm">

            {/* HEADER */}
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Licence</th>
                <th className="p-3 text-left">School</th>
                <th className="p-3 text-left">Class</th>
                <th className="p-3 text-left">Volume</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="p-3">{item.id}</td>

                  <td className="p-3 font-medium">
                    {item.name}
                  </td>

                  <td className="p-3 font-mono text-blue-600">
                    {item.licence_key}
                  </td>

                  <td className="p-3">
                    {item.school_name || "-"}
                  </td>

                  <td className="p-3">{item.class_name}</td>

                  <td className="p-3">{item.volume_name}</td>

                  {/* STATUS */}
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleToggle(item)}
                      className={`px-4 py-1 rounded-lg text-white text-xs ${
                        item.status === "ACTIVE"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {item.status === "ACTIVE"
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* EMPTY */}
          {data.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No licences found
            </div>
          )}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-4">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-medium">
            Page {page}
          </span>

          <button
            disabled={page * limit >= total}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

      </div>
    </AppLayout>
  );
};

export default LicenceListPage;