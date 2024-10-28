import { TypeAddress } from "@/types/address.type";
import { TypeCreateClient } from "@/types/client.type";
import { toast } from "react-toastify";

export const validateClientFields = (clientData: TypeCreateClient) => {
    for (const key in clientData) {
      if (key === "address") {
        for (const addressKey in clientData.address) {
          if (!clientData.address[addressKey as keyof TypeAddress]) {
            toast.error(`O campo ${addressKey} é obrigatório`);
            return false;
          }
        }
      } else if (!clientData[key as keyof TypeCreateClient]) {
        toast.error(`O campo ${key} é obrigatório`);
        return false;
      }
    }
    return true;
};