import { Flex, Icon, Box, Text, Spacer, VStack, Center, Heading } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import { MdLeaderboard } from 'react-icons/md'

interface TournamentRankingProps {
    participations: UserTournamentParticipation[]
}

const TournamentRanking: FC<TournamentRankingProps> = ({participations}: TournamentRankingProps ) => {
    const [ranking, setRanking] = useState<UserTournamentParticipation[]>([]);
    useEffect(() => {
        setRanking(participations.sort((a,b) => b.points - a.points));
    }, [participations])

    return <>
        <Center>
            <Heading fontSize="lg" display="inline-flex" alignItems="center">
                <Icon mr="5px" as={MdLeaderboard} /> Leaderboard
            </Heading>
        </Center>
        <VStack mt="30px">
            {ranking.map((participation, rank) => (
            <Flex w="100%">
                <Box>
                    {rank + 1} - {participation.participant.tagUsedToBe}
                </Box>
                <Spacer />
                <Box>
                    {participation.points} pts
                </Box>
            </Flex>
            ))}
        </VStack>
    </>
}

export default TournamentRanking