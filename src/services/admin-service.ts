import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";

export interface AdminMap {
  id: number;
  createdAt: string;
  teamId: number;
}

export interface AdminTrackerResult {
  id: number;
  createdAt: string;
  teamId: number;
}

export interface AdminTeam {
  id: number;
  createdAt: string;
  name: string;
}

export interface AdminUser {
  id: number;
  createdAt: string;
  name: string;
  email: string;
}

interface AdminDetailedData {
  users: AdminUser[];
  teams: AdminTeam[];
  maps: AdminMap[];
  trackerResults: AdminTrackerResult[];
}
interface AdminStats {
  nbTeams: number;
  nbUsers: number;
  nbMaps: number;
  nbTrackerResults: number;
}

interface AdminData {
  stats: AdminStats;
  data: AdminDetailedData;
}
async function getStats(): Promise<AdminData> {
  return await ky
    .get(`${BASE_URL}/admin/stats`, {
      credentials: "include",
    })
    .json();
}

export const adminService = {
  getStats,
};
