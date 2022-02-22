import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServerTournamentSubscribtion } from "./ServerTournamentSubscribtion";

@Entity()
export class Server extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  discordServerId: string;

  @OneToMany(() => ServerTournamentSubscribtion, (subscribedTournament) => subscribedTournament.server)
  subscribedTournaments: ServerTournamentSubscribtion[];
}