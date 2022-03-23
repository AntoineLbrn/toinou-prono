import { Match } from "./Match";
import { Vote } from "./Vote";

export enum BetStatus {
    WON = "WON",
    LOST = "LOST",
    PENDING = "PENDING"
}

export interface Bet {
  id: string;

  label: string;

  description: string;

  discordReactionCode: number;

  status: BetStatus;

  match: Match;

  votes: Vote[];
}