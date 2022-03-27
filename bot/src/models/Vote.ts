import { Bet } from "./Bet";
import { Match } from "./Match";
import { UserTournamentParticipation } from "./UserTournamentParticipation";

export interface Vote {
  id: string;
  bet: Bet;
  participation: UserTournamentParticipation;
  match: Match;
}