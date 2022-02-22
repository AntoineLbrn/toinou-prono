import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserTournamentParticipation } from "./UserTournamentParticipation";
import { ServerTournamentSubscribtion } from "./ServerTournamentSubscribtion";

@Entity()
export class Tournament extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('')
  label: string;

  @Column('')
  description: string;

  @OneToMany(() => UserTournamentParticipation, (participation) => participation.tournament)
  participations: UserTournamentParticipation[];

  @OneToMany(() => ServerTournamentSubscribtion, (subscription) => subscription.tournament)
  serversSubscriptions: ServerTournamentSubscribtion[];
}