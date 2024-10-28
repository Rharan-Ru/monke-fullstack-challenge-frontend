import instance from "@/config/api";
import { errorHook } from "./error.hook";

export const loginHook = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<
  | {
      access_token: string;
    }
  | boolean
> => {
  try {
    const response = await instance.post("auth/login", { email, password });
    return response.data;
  } catch (error: unknown) {
    return errorHook(error);
  }
};

export const registerHook = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<
  | {
    token: string;
    }
  | boolean> => {
  try {
    const response = await instance.post("user", { email, password });
    return response.data;
} catch (error: unknown) {
    return errorHook(error);
  }
};
