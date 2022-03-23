import { AfterLoad, BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bet } from "./Bet";
import { Tournament } from "./Tournament";
import { Vote } from "./Vote";

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

  @OneToMany(() => Vote, (vote) => vote.match)
  votes: Vote[];

  @AfterLoad()
  sortBets() {
    this.bets?.sort((bet1, bet2) => (bet1.discordReactionCode - bet2.discordReactionCode));
  }

  isMatchOver() {
    return this.isMatchManuallyClosed() || !this.manualVoteClosing && this.isMatchPassed();
  }


  /*
  Returns true if the match is not manual vote closing and is not outdated
   */
  isMatchPassed() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0,0,0,0);
    return new Date(this.date) < tomorrow;
  }

  /*
  Returns true if the match is manual vote closing and has been closed
   */
  isMatchManuallyClosed() {
    return this.isVoteClosed && this.manualVoteClosing;
  }

}