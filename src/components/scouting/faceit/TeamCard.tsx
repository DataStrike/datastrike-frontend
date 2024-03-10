import { useNavigate } from "react-router-dom";
import React from "react";
import default_team from "@/assets/default_team.svg";
import { TeamInfo } from "@/models/scouting/faceit/models.ts";

interface Props {
  team: TeamInfo;
}

export const TeamCard: React.FC<Props> = ({ team }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={
          "w-36 h-36 shadow p-2 rounded-lg hover:shadow-xl hover:cursor-pointer transition-all"
        }
        onClick={() => navigate(`/scouting/faceit/teams/${team.team_id}`)}
      >
        {!team.avatar && (
          <img
            src={default_team}
            className="w-full h-24 object-contain mb-"
            alt="default_team"
          />
        )}
        {team.avatar && (
          <img
            alt="avatar"
            className={"w-full h-24 object-contain mb-2"}
            src={team.avatar}
          />
        )}
        <div className="flex items-center  justify-between">
          <div className={"w-5/6 truncate"}>{team.name}</div>
        </div>
      </div>
    </>
  );
};
