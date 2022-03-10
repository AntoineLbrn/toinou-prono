import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Bet } from "./Bet";
import { User } from "./User";
import { UserTournamentParticipation } from "./UserTournamentParticipation";

@Entity()
@Unique("user vote", ["participation", "bet"])
export class Vote extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Bet, (bet) => bet.votes)
  bet: Bet;

  @ManyToOne(() => UserTournamentParticipation, (participation) => participation.votes, {eager: true})
  participation: UserTournamentParticipation;

  @Column({default: false})
  valid: boolean
}