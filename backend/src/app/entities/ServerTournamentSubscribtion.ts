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

  @Column({default: false})
  shouldAutoPostBets: boolean;

  @Column({nullable: true})
  autoPostBetsHour?: string;

  @Column({nullable: true})
  autoPostBetsMinutes?: string;

  @Column({nullable: true})
  bettorRoleId?: string;

  @Column({nullable: true})
  bettorRoleLabel?: string;

  @Column({nullable: true})
  bettorChannelId?: string;

  @Column({nullable: true})
  bettorChannelLabel?: string;
}