// components/LicenceStatusBadge.tsx
const LicenceStatusBadge = ({ status }: { status: string }) => {
  const colors: any = {
    ACTIVE: "bg-green-100 text-green-700",
    INACTIVE: "bg-gray-200 text-gray-600",
    EXPIRED: "bg-red-100 text-red-600",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded ${colors[status]}`}>
      {status}
    </span>
  );
};

export default LicenceStatusBadge;