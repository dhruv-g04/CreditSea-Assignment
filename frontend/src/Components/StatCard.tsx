import { StatCardProps } from "../Interface";

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
        <h4 className="text-lg font-semibold mb-2">{label}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    );
  };


export default StatCard