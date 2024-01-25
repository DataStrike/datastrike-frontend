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
        className="w-36 h-36"
        onClick={() => navigate(`/scouting/player/${player.player_id}`)}
      >
        <img
          alt="avatar"
          className={
            "w-full h-24 object-contain mb-2" +
            (player.privacy === "private" ? " opacity-50" : "")
          }
          src={player.avatar}
        />
        <div className="flex items-center  justify-between">
          <div className="w-5/6 truncate">{player.name}</div>
          {player.privacy === "private" && <LockIcon className="w-4 h-4" />}
        </div>
      </div>
    </>
  );
};

export default PlayerInfo;
