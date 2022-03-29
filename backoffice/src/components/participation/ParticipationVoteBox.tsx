import { Box, Text, Tooltip } from "@chakra-ui/react";
import { FC } from "react";
import { Match } from "../../models/Match";
import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import BetResult from "../bets/BetResult";
import VoteDisplayer from "../votes/VoteDisplayer";

interface ParticipationVoteBoxProps {
    participation: UserTournamentParticipation | undefined
    match: Match
    refetch: () => void
}

const ParticipationVoteBox: FC<ParticipationVoteBoxProps> = ({participation, match, refetch}) => {
    const today = new Date();
    const noAvailableBets = !match.bets.length;
    const matchVotesManuallyClosed = match.manualVoteClosing && match.isVoteClosed;
    const matchVotesAutomaticallyClosed = !match.manualVoteClosing && new Date(match.date).setHours(0,0,0,0) <= today.setHours(0,0,0,0) ;
    const votable = !matchVotesManuallyClosed && !match.manualVoteClosing && !matchVotesAutomaticallyClosed
    const vote = participation?.votes.find((vote) => vote.bet.match.id === match.id);

    return <Box textAlign="right" w="30%">
        {!participation ?
        <BetResult match={match} />
            : noAvailableBets ? 
            "Aucun pari dispo ❓" :
                <VoteDisplayer votable={votable} refetch={refetch} availableBets={match.bets} vote={vote} />
        }

    </Box>

}

export default ParticipationVoteBox;