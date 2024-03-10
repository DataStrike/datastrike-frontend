// PlayerInfo.tsx
import { PlayerInfos } from "@/services/scouting-service.ts";
import { LockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  team: PlayerInfos;
}

const PlayerInfo: React.FC<Props> = ({ team }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={
          "w-36 h-36 shadow p-2 rounded-lg cursor-pointer transition-all" +
          (team.privacy === "private"
            ? " opacity-20 pointer-events-none"
            : " hover:shadow-lg")
        }
        onClick={() => navigate(`/scouting/blizzard/player/${team.player_id}`)}
      >
        <img
          alt="avatar"
          className={"w-full h-24 object-contain mb-2"}
          src={team.avatar}
        />
        <div className="flex items-center  justify-between">
          <div
            className={
              "w-5/6 truncate" + (team.privacy !== "private" ? " w-full" : "")
            }
          >
            {team.name}
          </div>
          {team.privacy === "private" && <LockIcon className="w-4 h-4" />}
        </div>
      </div>
    </>
  );
};

export default PlayerInfo;
