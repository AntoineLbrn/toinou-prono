import { BaseEntity, Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserTournamentParticipation } from "./UserTournamentParticipation";
import { Tournament } from "./Tournament";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true} )
  discordUserId!: string;

  @Column()
  isSuperAdmin!: boolean;

  @Column()
  tagUsedToBe!: string;

  @OneToMany(() => UserTournamentParticipation, (participation) => participation.tournament)
  participations?: UserTournamentParticipation[];
}