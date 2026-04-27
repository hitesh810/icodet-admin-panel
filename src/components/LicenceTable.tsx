import LicenceStatusBadge from "./LicenceStatusBadge";
import { updateLicenceStatus } from "../services/licence.service";

const LicenceTable = ({ data, refresh, user }: any) => {

  const handleToggleStatus = async (lic: any) => {
    const newStatus =
      lic.status === "ACTIVE" ? "DEACTIVATED" : "ACTIVE";

    if (!window.confirm("Are you sure?")) return;

    await updateLicenceStatus({
      licence_id: lic.id,
      status: newStatus,
    });

    refresh();
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="p-2">Name</th>
            <th className="p-2">School</th>
            <th className="p-2">Type</th>
            <th className="p-2">Standard</th>
            <th className="p-2">Licence Key</th>
            <th className="p-2">Status</th>
            <th className="p-2">Last Used</th>
            <th className="p-2">DOB</th>

            {user === "SUPER_ADMIN" && (
              <th className="p-2">Action</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data?.licences?.map((lic: any) => (
            <tr key={lic.id} className="border-b hover:bg-gray-50">

              <td className="p-2">{lic.name || "-"}</td>

              <td className="p-2">{lic.school_name}</td>

              <td className="p-2">{lic.licence_type}</td>

              <td className="p-2">{lic.standard || "-"}</td>

              <td className="p-2">{lic.licence_key}</td>

              <td className="p-2">
                <LicenceStatusBadge status={lic.status} />
              </td>

              <td className="p-2">
                {lic.last_used
                  ? new Date(lic.last_used).toLocaleString()
                  : "-"}
              </td>

              <td className="p-2">
                {lic.dob
                  ? new Date(lic.dob).toLocaleDateString()
                  : "-"}
              </td>

              {user === "SUPER_ADMIN" && (
                <td className="p-2">
                  <button
                    onClick={() => handleToggleStatus(lic)}
                    className={`px-3 py-1 text-xs rounded text-white ${
                      lic.status === "ACTIVE"
                        ? "bg-red-500"
                        : "bg-green-600"
                    }`}
                  >
                    {lic.status === "ACTIVE"
                      ? "Deactivate"
                      : "Activate"}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LicenceTable;