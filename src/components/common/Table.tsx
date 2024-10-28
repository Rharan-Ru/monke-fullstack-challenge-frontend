import { TypeAddress } from "@/types/address.type";
import TableInformation from "./TableInformation";
import { useRef } from "react";

type TableListProp = {
  addressListData: TypeAddress[];
  handleNextPage: () => void;
  hasMore: boolean;
  totalCount: number;
  totalWeigth: number;
  isLoading: boolean;
};

const Table: React.FC<TableListProp> = ({
  addressListData,
  handleNextPage,
  hasMore,
  totalCount,
  totalWeigth,
  isLoading,
}) => {
  const divPaginationRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!hasMore || isLoading) return;
    if (
      divPaginationRef.current &&
      divPaginationRef.current.scrollTop +
        divPaginationRef.current.clientHeight ===
        divPaginationRef.current.scrollHeight
    ) {
      divPaginationRef.current.scrollTop =
        divPaginationRef.current.scrollTop - 50;
      handleNextPage();
    }
  };

  return (
    <>
      <TableInformation totalCount={totalCount} totalWeigth={totalWeigth} />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nome</th>
              <th className="py-3 px-6 text-left">Rua</th>
              <th className="py-3 px-6 text-left">Cidade</th>
              <th className="py-3 px-6 text-left">País</th>
              <th className="py-3 px-6 text-left">Peso (Kg)</th>
              <th className="py-3 px-6 text-left">Lat</th>
              <th className="py-3 px-6 text-left">Lng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7}>
                <div
                  className={`overflow-y-auto ${
                    addressListData.length > 3 ? "max-h-44" : ""
                  }`}
                  ref={divPaginationRef}
                  onScroll={handleScroll}
                >
                  <table className="min-w-full bg-white">
                    <tbody className="text-gray-600 text-sm font-light">
                      {addressListData.map((address) => (
                        <tr
                          className="border-b border-gray-200 hover:bg-gray-100"
                          key={address.id}
                        >
                          <td className="py-3 px-6">
                            {address?.client?.name || "Anonymus"}
                          </td>
                          <td className="py-3 px-6">{address.street}</td>
                          <td className="py-3 px-6">{address.city}</td>
                          <td className="py-3 px-6">{address.country}</td>
                          <td className="py-3 px-6">{address.weight} Kg</td>
                          <td className="py-3 px-6">{address.latitude}</td>
                          <td className="py-3 px-6">{address.longitude}</td>
                        </tr>
                      ))}
                      {isLoading && (
                        <tr>
                          <td
                            colSpan={7}
                            className="py-4 text-center text-gray-500"
                          >
                            Carregando...
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
