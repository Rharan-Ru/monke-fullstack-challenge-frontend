import instance from "@/config/api";
import { errorHook } from "./error.hook";
import { TypeCreateClient } from "@/types/client.type";
import { toast } from "react-toastify";

export const createClientHook = async ({
  name,
  address
}: TypeCreateClient): Promise<TypeCreateClient | boolean> => {
  try {
    if (address?.weight){
      address.weight = Number(address.weight);
    }
    const response = await instance.post("clients", { name, address });
    toast.success("Cliente criado com sucesso!");
    return response.data;
  } catch (error: unknown) {
    return errorHook(error);
  }
};

export const resetAllDataHook = async () => {
  try {
    const response = await instance.delete("clients/delete-all");
    toast.success("Dados deletados com sucesso!");
    return response.data;
  } catch (error: unknown) {
    return errorHook(error);
  }
}

export const clientInitialStates: TypeCreateClient = {
  name: "",
  address: {
    city: "",
    country: "",
    street: "",
    complement: "",
    latitude: "",
    longitude: "",
    number: "",
    neighborhood: "",
    state: "",
    weight: "",
  },
};