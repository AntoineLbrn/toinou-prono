import { Bet } from "./Bet";
import Tournament from "./Tournament";

export interface Match {
  id: string;

  label: string;
  
  description?: string;

  manualVoteClosing: boolean

  isVoteClosed: boolean 

  date: Date;

  discordMessageId?: string;

  tournament: Tournament;
  
  bets: Bet[];
}