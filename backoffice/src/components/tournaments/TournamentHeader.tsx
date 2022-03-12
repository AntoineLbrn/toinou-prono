import { Flex, Icon, Box, Text } from "@chakra-ui/react";
import { FC } from "react";
import { MdEmojiEvents, MdStar } from "react-icons/md";
import Tournament from "../../models/Tournament";
import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import history from '../../utils/history';
import TournamentHeaderParticipationRank from "../participation/ParticipationRank";
import JoinTournamentButton from "./JoinTournamentButton";

interface TournamentHeaderProps {
    participation: UserTournamentParticipation | undefined
    tournament: Tournament
    refetch?: () => void
}

const TournamentHeader: FC<TournamentHeaderProps> = ({participation, tournament, refetch}: TournamentHeaderProps ) => (
    <Flex _hover={{cursor: 'pointer'}} fontWeight="bold" fontSize="xl" onClick={() => history.push(`/tournament/${tournament.id}`)} textAlign="center" alignContent="stretch">
        <Text flex="1" color="pink.200" display="inline">
            {participation ? <>
                <Icon verticalAlign="middle" as={MdEmojiEvents}/><TournamentHeaderParticipationRank tournamentId={tournament.id} />
            </> : <JoinTournamentButton refetch={refetch} tournamentId={tournament.id} />}
        </Text>
        <Box fontSize="2xl"  flex="1">
            {tournament.label}
        </Box>
        <Text color="pink.200" flex="1" display="inline">
            {participation && <>
                <Icon verticalAlign="middle" as={MdStar} /> {participation.points} points
            </>}
        </Text>
    </Flex>
)

export default TournamentHeader