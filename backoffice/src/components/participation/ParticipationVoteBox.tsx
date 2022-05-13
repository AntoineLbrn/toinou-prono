import { InfoIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import betStatusAsColor from "../../utils/betStatusAsColor";
import { FC } from "react";
import { BetStatus } from "../../models/Bet";
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
    today.setHours(today.getHours() + 1);
    const noAvailableBets = !match.bets.length;
    const matchVotesManuallyClosed = match.manualVoteClosing && match.isVoteClosed;
    const matchVotesAutomaticallyClosed = !match.manualVoteClosing && new Date(match.date) <= today ;
    const votable = !matchVotesManuallyClosed && !match.manualVoteClosing && !matchVotesAutomaticallyClosed
    const vote = participation?.votes.find((vote) => vote.bet.match.id === match.id);

    return <Box textAlign="right" w="30%">
        {!participation ?
        <BetResult match={match} />
            : noAvailableBets
            ? <Text>Aucun pari dispo <InfoIcon color={betStatusAsColor(BetStatus.PENDING)}/> </Text>
            :    <VoteDisplayer votable={votable} refetch={refetch} availableBets={match.bets} vote={vote} />
        }

    </Box>

}

export default ParticipationVoteBox;