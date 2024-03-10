import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/Dashboard.tsx";
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
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/tracker",
            element: <Tracker />,
          },
          {
            path: "/analysis",
            element: <Analysis />,
          },
          {
            path: "/analysis/:mapId",
            element: <AnalysisDetailed />,
          },
          {
            path: "/teams",
            element: <Teams />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/scouting",
            element: <Scouting />,
          },
          {
            path: "/scouting/faceit/teams/:teamId",
            element: <Team />,
          },
          {
            path: "/scouting/faceit/players/:playerId",
            element: <Player />,
          },
          {
            path: "/scouting/faceit/matches/:matchId",
            element: <Match />,
          },
          {
            path: "/scouting/blizzard/player/:playerId",
            element: <ScoutingPlayer />,
          },
          {
            path: "/admin",
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);
