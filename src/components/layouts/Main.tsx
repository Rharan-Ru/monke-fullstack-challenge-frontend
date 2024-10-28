"use client";

import { useCallback, useEffect, useState } from "react";
import AddressInput from "../common/AddressInput";
import Button from "../common/Button";
import Input from "../common/Input";
import Map from "../common/Map";
import Table from "../common/Table";
import { TypeAddress, TypeAddressMarkers } from "@/types/address.type";
import { TypeCreateClient } from "@/types/client.type";
import {
  clientInitialStates,
  createClientHook,
  resetAllDataHook,
} from "@/hooks/client.hook";
import {
  getAddressListForMapMarkersHook,
  getAddressListHook,
} from "@/hooks/address.hook";
import Modal from "../common/Modal";
import { validateClientFields } from "@/utils/clientFieldsValidation";
import { logoutHook } from "@/hooks/login.hook";

const Main: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState({
    client: false,
    address: false,
  });
  const [addressMarkers, setAddressMarkers] = useState<TypeAddressMarkers[]>(
    []
  );
  const [addressListData, setAddressListData] = useState<TypeAddress[]>([]);
  const [addressPagination, setAddressPagination] = useState({
    page: 1,
    hasMore: false,
    totalCount: 0,
  });
  const [addressTotalWeight, setAddressTotalWeight] = useState(0);
  const [clientData, setClientData] = useState<TypeCreateClient>({
    ...clientInitialStates,
  });

  const resetClientData = () => {
    setClientData({ ...clientInitialStates });
    setInputValue("");
  };

  const resetAllData = async () => {
    const response = await resetAllDataHook();
    if (!response) return;
    resetClientData();
    setAddressListData([]);
    setAddressMarkers([]);
    setAddressPagination({
      page: 1,
      hasMore: false,
      totalCount: 0,
    });
    setAddressTotalWeight(0);
    setInputValue("");
  };

  const handleClientData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "weight") {
      const validatedWeight =
        value.length <= 10 && /^[0-9]+$/.test(value) && Number(value) > 0
          ? value
          : clientData?.address?.weight || "";

      setClientData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          weight: value === "" ? "" : validatedWeight,
        },
      }));
    } else {
      setClientData({
        ...clientData,
        [name]: value,
      });
    }
  };

  const handleAddress = (addressData: TypeAddress) => {
    setClientData((prevData) => ({
      ...prevData,
      address: {
        ...addressData,
        weight: prevData.address?.weight || "",
      },
    }));
  };

  const handleCreateClient = async () => {
    if (!validateClientFields(clientData)) return;
    setIsLoading((prevData) => ({
      ...prevData,
      client: true,
    }));
    const response = await createClientHook(clientData);
    if (!response) {
      setIsLoading((prevData) => ({
        ...prevData,
        client: false,
      }));
      return;
    }
    setAddressListData((prevData: TypeAddress[]) => [
      {
        ...clientData?.address,
        id: clientData?.address?.id || Math.random(),
        client: {
          name: clientData?.name,
        },
      } as TypeAddress,
      ...prevData,
    ]);
    setAddressMarkers((prevData: TypeAddressMarkers[]) => [
      {
        id: clientData?.address?.id || Math.random(),
        latitude: clientData?.address?.latitude,
        longitude: clientData?.address?.longitude,
        client: {
          name: clientData?.name,
        },
      } as TypeAddressMarkers,
      ...prevData,
    ]);
    setAddressTotalWeight((prevState) => {
      return prevState + Number(clientData?.address?.weight || 0);
    });
    setAddressPagination((prevData) => ({
      ...prevData,
      totalCount: prevData.totalCount + 1,
    }));
    resetClientData();
    setIsLoading((prevData) => ({
      ...prevData,
      client: false,
    }));
  };

  const handleGetAddressCallback = useCallback(
    async (isNext?: boolean) => {
      setIsLoading((prevData) => ({
        ...prevData,
        address: true,
      }));
      const newPage = isNext ? addressPagination.page + 1 : 1;
      const response = await getAddressListHook(newPage);
      if (
        typeof response === "boolean" ||
        !response.data ||
        !Array.isArray(response.data)
      ) {
        setIsLoading((prevData) => ({ ...prevData, address: false }));
        return;
      }
      if (isNext) {
        setAddressListData((prevData) => [...prevData, ...response.data]);
      } else {
        setAddressListData(response.data);
      }
      setAddressPagination((prevData) => ({
        ...prevData,
        hasMore: response.hasMore,
        page: newPage,
        totalCount: response.totalCount,
      }));
      setAddressTotalWeight(response.totalWeight);
      setIsLoading((prevData) => ({
        ...prevData,
        address: false,
      }));
    },
    [addressPagination.page]
  );

  const handleOpenConfirmationModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (addressListData.length === 0) {
      handleGetAddressCallback();
    }
  }, [addressListData.length, handleGetAddressCallback]);

  const handleGetAddressMarkersCallback = useCallback(async () => {
    const response = await getAddressListForMapMarkersHook();
    if (typeof response === "boolean" || !Array.isArray(response)) return;
    setAddressMarkers(response);
  }, []);

  useEffect(() => {
    handleGetAddressMarkersCallback();
  }, [handleGetAddressMarkersCallback]);

  return (
    <main className="container mx-auto my-auto grid grid-cols-1 md:grid-cols-3 gap-2 w-full h-full">
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          confirmationMessage="Deseja realmente resetar os dados dos clientes?"
          onCancel={() => setIsModalOpen(false)}
          onConfirm={resetAllData}
        />
      )}
      <div className="md:col-span-1 flex flex-col p-5 bg-gray-50">
        <Input
          type="text"
          placeholder="Nome do Cliente"
          key="name"
          name="name"
          onChange={handleClientData}
          value={clientData.name}
        />
        <Input
          type="text"
          placeholder="Peso da Entrega"
          key="weight"
          name="weight"
          onChange={handleClientData}
          value={clientData?.address?.weight}
        />
        <AddressInput
          placeholder="Digite o Endereço"
          onChange={handleAddress}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />

        <div className="flex flex-row align-middle justify-center gap-2">
          <Input
            isReadOnly={true}
            value={clientData?.address?.latitude}
            placeholder="Latitude"
          />
          <Input
            isReadOnly={true}
            value={clientData?.address?.longitude}
            placeholder="Longitude"
          />
        </div>

        <Button
          placeholder="Cadastrar Cliente"
          onClick={handleCreateClient}
          buttonStyle="bg-green-600 text-white hover:bg-green-700"
          disabled={
            isLoading.client ||
            !clientData.name ||
            !clientData?.address?.weight ||
            !clientData?.address?.city
          }
        />
        <Button
          placeholder="Resetar Cadastro"
          buttonStyle="bg-red-600 text-white hover:bg-red-700"
          onClick={handleOpenConfirmationModal}
        />
        <Button
          placeholder="Sair"
          buttonStyle="bg-yellow-300 text-black hover:bg-yellow-400"
          onClick={logoutHook}
        />
      </div>

      <div className="md:col-span-2 p-5 bg-gray-50">
        <Map addressListData={addressMarkers} />
        <Table
          addressListData={addressListData}
          hasMore={addressPagination.hasMore}
          handleNextPage={() => handleGetAddressCallback(true)}
          totalCount={addressPagination.totalCount}
          totalWeigth={addressTotalWeight}
          isLoading={isLoading.address}
        />
      </div>
    </main>
  );
};

export default Main;
