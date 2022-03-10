import { Box, Text, Container, Flex, Skeleton, Spacer, HStack } from "@chakra-ui/react"
import { FC } from "react"
import { useQuery } from "react-query";
import getTournament from "../../api/tournaments/getTournament";
import getCurrentUserParticipationByTournament from "../../api/userTournamentParticipations/getCurrentUserParticipationByTournament";
import getCurrentUserParticipations from "../../api/userTournamentParticipations/getCurrentUserParticipations";
import { Match } from "../../models/Match";
import Tournament from "../../models/Tournament";
import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import groupMatchesByDate from "../../utils/groupMatchesByDate";
import UserTournamentParticipationMatchItem from "../matches/MatchItem";
import TournamentHeader from "./TournamentHeader";
import TournamentRanking from "./TournamentRanking";

interface TournamentDetailProps {
    tournamentId: string;
}

const TournamentDetail: FC<TournamentDetailProps> = ({tournamentId}) => {
    const { data: tournament, refetch: refetchTournament, isLoading: tournamentIsLoading } = useQuery<Tournament>(
        `getTournament${tournamentId}`,
        () => getTournament(tournamentId)
    );
    const { data: participation, refetch: refetchParticipation, isLoading: participationIsLoading } = useQuery<UserTournamentParticipation>(
        `getCurrentUserParticipation${tournamentId}`,
        () => getCurrentUserParticipationByTournament({tournamentId})
    );

    const matchsGroupedByDate = tournament ? groupMatchesByDate(tournament?.matches) : [];


    return <Box w="80%" mt="20px" py="10px" mx="auto" boxShadow="0 0 .2rem #fff, 0 0 .2rem #fff" bgColor="#1E2F3D">
        <Skeleton isLoaded={!(tournamentIsLoading || participationIsLoading)} >
            {tournament && <TournamentHeader participation={participation} tournament={tournament}/>}
            <Flex py="30px" >
                <Box w="70%" borderRight="0.5px solid white">
                    {Object.keys(matchsGroupedByDate).map((key) => {
                        return <Container key={key} maxW="container.lg">
                            <Flex mb="20px">
                                <Text w="30%" fontSize="xl">{key}</Text>
                                <Spacer />
                                <Text w="30%" align='right'>{participation ? 'Vos paris' : 'Paris'}</Text>
                            </Flex>
                            {matchsGroupedByDate[key].map((match: Match) => (
                                <UserTournamentParticipationMatchItem key={match.id} participation={participation} match={match} refetch={() => {refetchParticipation(); refetchTournament()}} />
                            ))}
                        </Container>
                    })}
                </Box>
                <Box flex="1" px="10px">
                    {tournament && <TournamentRanking participations={tournament?.participations}  />}  
                </Box>
            </Flex>
        </Skeleton>
    </Box>
}

export default TournamentDetail