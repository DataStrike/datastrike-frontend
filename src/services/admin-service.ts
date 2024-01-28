import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";

interface AdminStats {
  teams: any;
  users: any;
  maps: any;
  trackerResults: any;
}
async function getStats(): Promise<AdminStats> {
  return await ky
    .get(`${BASE_URL}/admin/stats`, {
      credentials: "include",
    })
    .json();
}

export const adminService = {
  getStats,
};
