import { AfterUpdate, BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Match } from "./Match";
import { Vote } from "./Vote";


export enum BetStatus {
    WON = "WON",
    LOST = "LOST",
    PENDING = "PENDING"
}

@Entity()
export class Bet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label!: string;

  @Column({nullable: true})
  description?: string;

  @Column()
  discordReactionCode!: number;

  @Column({default: BetStatus.PENDING})
  status!: BetStatus;

  @ManyToOne(() => Match, (match) => match.bets)
  match: Match;

  @OneToMany(() => Vote, (vote) => vote.bet, {eager: true})
  votes: Vote[];

  @AfterUpdate()
  validateVote() {
    if (this.status === BetStatus.WON) {
      this.votes.forEach((vote) => {
        if (!vote.valid) {
          vote.valid = true;
          vote.participation.points+=1;
          vote.save();
          vote.participation.save();
        }
      })  
    }
  }

  @AfterUpdate()
  invalidateVote() {
    console.log("invalidating")
    if (this.status !== BetStatus.WON) {
      this.votes.forEach((vote) => {
        if (vote.valid) {
          console.log(vote)
          vote.valid = false;
          vote.participation.points-=1;
          vote.save();
          vote.participation.save();
        }
      })  
    }
  
  }
}