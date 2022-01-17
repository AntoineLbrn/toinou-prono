import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserTournamentParticipation } from "./UserTournamentParticipation";
import { ServerTournamentSubscribtion } from "./ServerTournamentSubscribtion";

@Entity()
export class Tournament extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => UserTournamentParticipation, (participation) => participation.tournament)
  participations: UserTournamentParticipation[];

  @OneToMany(() => ServerTournamentSubscribtion, (subscription) => subscription.tournament)
  serversSubscriptions: ServerTournamentSubscribtion[];
}