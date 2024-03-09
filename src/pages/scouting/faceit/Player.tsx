import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { faceitScoutingService } from "@/services/scouting-service.ts";
import { Match, Team } from "@/models/scouting/faceit/models.ts";

import default_team from "@/assets/default_team.svg";
import default_person from "@/assets/default_person.svg";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { getCETTimeFormatted } from "@/utils/functions.ts";
export function Player() {
  const navigate = useNavigate();

  const { playerId } = useParams();
  const { data: playerDetails, isFetching: playerDetailsLoading } = useQuery({
    queryKey: ["playerDetails", playerId],
    queryFn: () => faceitScoutingService.getFaceitPlayerDetails(playerId!),
  });

  const { data: playerHistory, isFetching: playerHistoryLoading } = useQuery({
    queryKey: ["playerHistory", playerId],
    queryFn: () => faceitScoutingService.getFaceitPlayerHistory(playerId!),
  });

  return (
    <div>
      <Button
        variant="ghost"
        className="w-fit pl-3 mb-2"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      {playerDetailsLoading && <div>Loading...</div>}
      {!playerDetailsLoading && playerDetails && (
        <div>
          <div className="flex gap-4 mb-8">
            {playerDetails.avatar && (
              <img
                src={playerDetails.avatar}
                alt="player avatar"
                className="h-48 w-48"
              />
            )}
            {!playerDetails.avatar && (
              <img
                src={default_person}
                alt="player avatar"
                className="h-48 w-48"
              />
            )}
            <h1 className="text-3xl">{playerDetails.nickname}</h1>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">Player history</h1>
      {playerHistoryLoading && <div>Loading...</div>}
      {!playerHistoryLoading && playerHistory && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-6 justify-center">
          {playerHistory.items.map((match) => (
            <MatchRow match={match} key={match.match_id} />
          ))}
        </div>
      )}
    </div>
  );
}

interface MatchRowProps {
  match: Match;
}

const MatchRow = ({ match }: MatchRowProps) => {
  const navigate = useNavigate();

  return (
    <div className="gap-2 border p-6 rounded-lg w-96">
      <div className="text-center mb-4 text-neutral-500">
        {getCETTimeFormatted(match.started_at)}
      </div>
      <div className="flex gap-6 items-center justify-between">
        <TeamCard team={match.teams.faction1} />
        <TeamResult score={match.results.score.faction1} />
        <div>-</div>
        <TeamResult score={match.results.score.faction2} />
        <TeamCard team={match.teams.faction2} />
      </div>
      <div className="flex justify-center mt-4">
        <Button
          variant="default"
          onClick={() => {
            navigate(`/scouting/faceit/matches/${match.match_id}`);
          }}
        >
          View match
        </Button>
      </div>
    </div>
  );
};

interface TeamResultProps {
  score: number;
}
const TeamResult = ({ score }: TeamResultProps) => {
  return <div className="text-xl">{score}</div>;
};

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <div className="flex flex-col gap-1 items-center text-wrap">
      {team.avatar && (
        <img src={team.avatar} alt="team avatar" className="h-24 w-24" />
      )}
      {!team.avatar && (
        <img src={default_team} alt="team avatar" className="h-24 w-24" />
      )}
      <div className="">{team.nickname}</div>
    </div>
  );
};
