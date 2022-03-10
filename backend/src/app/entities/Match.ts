import { AfterLoad, BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bet } from "./Bet";
import { Tournament } from "./Tournament";

@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label!: string;

  @Column({nullable: true})
  description?: string;

  @Column()
  date!: Date;

  @Column({default: false})
  manualVoteClosing!: boolean;

  @Column({default: false})
  isVoteClosed!: boolean;

  /* This attribute is used to know which bet user is reacting to */
  @Column({nullable: true})
  discordMessageId?: string;

  @ManyToOne(() => Tournament, (tournament) => tournament.matches)
  tournament: Tournament;

  @OneToMany(() => Bet, (bet) => bet.match)
  bets: Bet[];

  @AfterLoad()
  sortBets() {
    this.bets?.sort((bet1, bet2) => (bet1.discordReactionCode - bet2.discordReactionCode));
  }
}