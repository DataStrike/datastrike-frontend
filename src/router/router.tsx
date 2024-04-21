import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home.tsx";
import { AuthLayout } from "@/pages/AuthLayout.tsx";
import { Layout } from "@/pages/Layout.tsx";
import { Tracker } from "@/pages/Tracker.tsx";
import { Analysis } from "@/pages/Analysis.tsx";
import { Teams } from "@/pages/Teams.tsx";
import Profile from "@/pages/Profile.tsx";
import { AnalysisDetailed } from "@/pages/AnalysisDetailed.tsx";
import Scouting from "@/pages/scouting/Scouting.tsx";
import { ScoutingPlayer } from "@/pages/scouting/blizzard/ScoutingPlayer.tsx";
import { Player } from "@/pages/scouting/faceit/Player.tsx";
import Admin from "@/pages/Admin.tsx";
import { Team } from "@/pages/scouting/faceit/Team.tsx";
import { Match } from "@/pages/scouting/faceit/Match.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "tracker",
    element: <AuthLayout><Layout><Tracker /></Layout></AuthLayout>,
  },
  {
    path: "analysis",
    element: <AuthLayout><Layout><Analysis /></Layout></AuthLayout>,
  },
  {
    path: "analysis/:mapId",
    element: <AuthLayout><Layout><AnalysisDetailed /></Layout></AuthLayout>,
  },
  {
    path: "teams",
    element: <AuthLayout><Layout><Teams /></Layout></AuthLayout>,
  },
  {
    path: "profile",
    element: <AuthLayout><Layout><Profile /></Layout></AuthLayout>,
  },
  {
    path: "scouting",
    element: <AuthLayout><Layout><Scouting /></Layout></AuthLayout>,
  },
  {
    path: "scouting/faceit/teams/:teamId",
    element: <AuthLayout><Layout><Team /></Layout></AuthLayout>,
  },
  {
    path: "scouting/faceit/players/:playerId",
    element: <AuthLayout><Layout><Player /></Layout></AuthLayout>,
  },
  {
    path: "scouting/faceit/matches/:matchId",
    element: <AuthLayout><Layout><Match /></Layout></AuthLayout>,
  },
  {
    path: "scouting/blizzard/player/:playerId",
    element: <AuthLayout><Layout><ScoutingPlayer /></Layout></AuthLayout>,
  },
  {
    path: "admin",
    element: <AuthLayout><Layout><Admin /></Layout></AuthLayout>,
  },
]);
