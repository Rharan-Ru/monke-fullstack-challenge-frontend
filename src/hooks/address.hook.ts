import instance from "@/config/api";
import { errorHook } from "./error.hook";
import { TypeAddress, TypeAddressMarkers } from "@/types/address.type";

export const getAddressListHook = async (pageNumber = 1): Promise<
  | {
      data: TypeAddress[];
      hasMore: boolean;
      totalCount: number;
      totalWeight: number;
    }
  | boolean
> => {
  try {
    const response = await instance.get("address", {
      params: {
        pageNumber,
      },
    });
    return {
      data: response.data.address,
      hasMore: response.data.hasMore,
      totalCount: response.data.totalCount,
      totalWeight: response.data.totalWeight,
    }
  } catch (error: unknown) {
    return errorHook(error);
  }
};

export const getAddressListForMapMarkersHook = async (): Promise<
  | TypeAddressMarkers[]
  | boolean
> => {
  try {
    const response = await instance.get("address/map-markers");
    return response.data;
  } catch (error: unknown) {
    return errorHook(error);
  }
}