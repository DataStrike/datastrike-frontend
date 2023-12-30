import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";

export const useAuth = async () => {
  try {
    return await ky
      .get(`${BASE_URL}/me`, {
        credentials: "include",
      })
      .json();
  } catch (error) {
    // Return null or some default value to indicate authentication failure
    return null;
  }
};
