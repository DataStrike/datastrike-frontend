import { create } from "zustand";
import { Team } from "@/models/teams/columns.tsx";

interface TeamStore {
  currentTeam: Team | null;
  updateTeam: (team: Team) => void;
  isLoading: boolean;
}
export const useTeamStore = create<TeamStore>((set) => ({
  currentTeam: null as Team | null,
  updateTeam: (team: Team) => set({ currentTeam: team }),
  isLoading: true,
}));