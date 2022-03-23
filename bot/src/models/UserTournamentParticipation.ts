import Tournament from "./Tournament";
import User from "./User";
import { Vote } from "./Vote";

export interface UserTournamentParticipation {
  id: string;
  participant: User;
  tournament: Tournament;
  shouldBeNotified: boolean;
  votes: Vote[]
  points: number;
}