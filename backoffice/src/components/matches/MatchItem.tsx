
import { Flex, Icon, Box, Text, Tooltip } from "@chakra-ui/react";
import { FC } from "react";
import { MdEmojiEvents, MdStar } from "react-icons/md";
import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import { Match } from "../../models/Match";
import { InfoIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import betStatusAsColor from '../../utils/betStatusAsColor'
import { BetStatus } from "../../models/Bet";
import UserTournamentParticipationMatchTitle from "./MatchTitle";
import UserTournamentParticipationVote from "../participation/ParticipationVoteBox";

interface MatchItemProps {
    match: Match     
    participation: UserTournamentParticipation | undefined
    refetch: () => void
}

const MatchItem: FC<MatchItemProps> = ({match, participation, refetch}) => {    
    return <Flex my="30px">
        <UserTournamentParticipationMatchTitle match={match} />
        <Box flex="1" height="12px" mr="30px" borderBottom=".5px solid #fff" />
        <UserTournamentParticipationVote refetch={refetch} match={match} participation={participation} />
    </Flex>
}

export default MatchItem