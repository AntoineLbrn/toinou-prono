import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tournament } from "./Tournament";
import { User } from "./User";

@Entity()
export class UserTournamentParticipation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.participations)
  participant: User;

  @ManyToOne(() => Tournament, (tournament) => tournament.participations)
  tournament: Tournament;

  @Column()
  shouldBeNotified: boolean;
}