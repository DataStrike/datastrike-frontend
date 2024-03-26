import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { faceitScoutingService } from "@/services/scouting-service.ts";
import { Match, Team } from "@/models/scouting/faceit/models.ts";

import default_team from "@/assets/default_team.svg";
import default_person from "@/assets/default_person.svg";

import { ArrowLeft, LinkIcon, AlertTriangle } from "lucide-react";
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
      {!playerDetailsLoading && playerDetails && (
        <div>
          <div className="flex gap-4 mb-8">
            {playerDetails.avatar && (
              <img
                src={playerDetails.avatar}
                alt="player avatar"
                className="h-32 w-32 rounded-lg"
              />
            )}
            {!playerDetails.avatar && (
              <img
                src={default_person}
                alt="player avatar"
                className="h-32 w-32"
              />
            )}
            <h1 className="text-3xl">{playerDetails.nickname}</h1>
          </div>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-2">Player history</h1>
      <div
        className={
          "border-orange-200 border bg-orange-100 p-4 w-fit rounded-lg mb-2 flex gap-2 items-center"
        }
      >
        <AlertTriangle className="w-4 h-4" />
        <span>
          The FACEIT API results are not correct / complete. Click on a match
          details to see the correct ones.
        </span>
      </div>
      {!playerHistoryLoading && playerHistory && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-6 ">
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
    <div className="gap-2 border p-6 rounded-lg w-[400px]">
      <div className="text-center mb-1 text-neutral-500">
        {match.competition_name}
      </div>
      <div className="text-center mb-4 text-neutral-500">
        {getCETTimeFormatted(match.started_at)}
      </div>
      <div className="flex gap-6 items-center justify-between">
        <TeamCard team={match.teams.faction1} />
        <TeamResult score={match.results.score.faction1} />
        <span className={"text-3xl"}>-</span>
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
          <LinkIcon className="w-4 h-4 mr-2" />
          Match details
        </Button>
      </div>
    </div>
  );
};

interface TeamResultProps {
  score: number;
}

const TeamResult = ({ score }: TeamResultProps) => {
  return <div className="text-3xl">{score}</div>;
};

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <div className="flex flex-col gap-1 items-center">
      {team.avatar && (
        <img
          src={team.avatar}
          alt="team avatar"
          className="max-h-24 max-w-24 rounded-lg"
        />
      )}
      {!team.avatar && (
        <img src={default_team} alt="team avatar" className="h-24 max-w-24" />
      )}
      <div className="truncate text-sm">{team.nickname}</div>
    </div>
  );
};
