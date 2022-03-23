import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Bet } from "./Bet";
import { Match } from "./Match";
import { UserTournamentParticipation } from "./UserTournamentParticipation";

@Entity()
@Unique("user can vote one per match", ["participation", "match"])
export class Vote extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Bet, (bet) => bet.votes)
  bet: Bet;

  @ManyToOne(() => Match, (match) => match.votes)
  match: Match;

  @ManyToOne(() => UserTournamentParticipation, (participation) => participation.votes, {eager: true})
  participation: UserTournamentParticipation;

  @Column({default: false})
  valid: boolean
}