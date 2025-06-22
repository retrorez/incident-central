type Incident = {
    id: number;
    service: string;
    message: string;
    severity: string;
    timestamp: string;
    sourceApp: string;
    tags: string;
    onDelete: (id:number) => void;
};

export default function IncidentRow({
  id,
  service,
  message,
  severity,
  timestamp,
  sourceApp,
  tags,
  onDelete
}: Incident) {
  return (
    <tr className="text-white border-t border-gray-600">
      <td className="p-2 text-gray-700">{id}</td>
      <td className="p-2 text-gray-700">{service}</td>
      <td className="p-2 text-gray-700">{message}</td>
      <td className="p-2 text-gray-700">{severity}</td>
      <td className="p-2 text-gray-700">{timestamp.split("T")[0]}</td>
      <td className="p-2 text-gray-700">{sourceApp}</td>
      <td className="p-2 text-gray-700">{tags}</td>
      <td className="p-2 text-gray-700">
        <button
          onClick={() => onDelete(id)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded shadow-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}