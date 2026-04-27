interface Props {
  title: string;
  value: number;
}

const StatsCard = ({ title, value }: Props) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
};

export default StatsCard;