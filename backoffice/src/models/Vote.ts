import { Bet } from "./Bet";
import { UserTournamentParticipation } from "./UserTournamentParticipation";

export interface Vote {
  id: string;
  bet: Bet;
  participation: UserTournamentParticipation;
}