import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Tournament } from "./Tournament";
import { User } from "./User";
import { Vote } from "./Vote";

@Entity()
@Unique("user participation", ["tournament", "participant"])
export class UserTournamentParticipation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.participations)
  participant: User;

  @ManyToOne(() => Tournament, (tournament) => tournament.participations)
  tournament: Tournament;

  @Column({default: false})
  shouldBeNotified: boolean;

  @OneToMany(() => Vote, (vote) => vote.participation)
  votes?: Vote[];

  @Column({default: 0})
  points: number;
}