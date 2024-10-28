import { CustomError } from "@/types/error.type";
import { toast } from "react-toastify";

export const errorHook = (error: unknown) => {
    const errorData = error as CustomError;
    const message = errorData?.response?.data?.message || errorData.response.message   
    if (typeof message === "string") {
      toast.error(message);
    } else {
      message?.message.forEach((msg) => {
        toast.error(msg);
      });
    }
    return false;
}