import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Server } from "./Server";
import { Tournament } from "./Tournament";

@Entity()
export class ServerTournamentSubscribtion extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Server, (server) => server.subscribedTournaments)
  server: Server;

  @ManyToOne(() => Tournament, (tournament) => tournament.serversSubscriptions)
  tournament: Tournament;

  @Column()
  shouldAutoPostBets: boolean;

  @Column()
  autoPostBetsHour: string;

  @Column()
  autoPostBetsMinutes: string;

  @Column()
  bettorRoleId: string;

  @Column()
  bettorChannelId: string;
}