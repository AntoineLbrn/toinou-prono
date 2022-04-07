import { BaseEntity, Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserTournamentParticipation } from "./UserTournamentParticipation";

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

  @OneToMany(() => UserTournamentParticipation, (participation) => participation.participant)
  participations?: UserTournamentParticipation[];
}