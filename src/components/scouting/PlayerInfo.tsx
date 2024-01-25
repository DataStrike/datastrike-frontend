// PlayerInfo.tsx
import { PlayerInfos } from "@/services/scouting-service.ts";
import { LockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  player: PlayerInfos;
}

const PlayerInfo: React.FC<Props> = ({ player }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={
          "w-36 h-36 border p-2 rounded-lg cursor-pointer transition-all" +
          (player.privacy === "private"
            ? " opacity-20 pointer-events-none"
            : " hover:shadow-lg")
        }
        onClick={() => navigate(`/scouting/player/${player.player_id}`)}
      >
        <img
          alt="avatar"
          className={"w-full h-24 object-contain mb-2"}
          src={player.avatar}
        />
        <div className="flex items-center  justify-between">
          <div
            className={
              "w-5/6 truncate" + (player.privacy !== "private" ? " w-full" : "")
            }
          >
            {player.name}
          </div>
          {player.privacy === "private" && <LockIcon className="w-4 h-4" />}
        </div>
      </div>
    </>
  );
};

export default PlayerInfo;
