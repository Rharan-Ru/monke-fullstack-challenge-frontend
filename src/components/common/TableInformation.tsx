type TableListProp = {
  totalCount: number;
  totalWeigth: number;
};

const TableInformation: React.FC<TableListProp> = ({
  totalCount,
  totalWeigth,
}) => {
  const totalClients = totalCount;
  const ticketMedia =
    totalCount > 0 ? (totalWeigth / totalCount).toFixed(2) : 0;

  return (
    <div className="flex justify-between bg-gray-100 p-5 mb-2">
      <div>
        <h1 className="text-sm font-semibold text-gray-900">
          Clientes Totais: {totalClients}
        </h1>
      </div>
      <div>
        <h1 className="text-sm font-semibold text-gray-900">
          Peso Total: {totalWeigth} Kg
        </h1>
      </div>
      <div>
        <h1 className="text-sm font-semibold text-gray-900">
          Ticket Médio: {ticketMedia} Kg
        </h1>
      </div>
    </div>
  );
};

export default TableInformation;
