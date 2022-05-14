import { InfoIcon } from "@chakra-ui/icons";
import { Box, BreadcrumbSeparator, Center, Container, Flex, HStack, Icon, Spacer, Text, Tooltip } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { Match } from "../../models/Match";
import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import UserTournamentParticipationMatchItem from "../matches/MatchItem";
import history from '../../utils/history';
import TournamentHeader from "../tournaments/TournamentHeader";

interface ParticipationBoxProps {
    participation: UserTournamentParticipation
    highlighted: boolean
    refetch: () => void
}

//const colors = ["#BC61E9", "#98E887", "#FB4C5C", "#FEFB53"]

const ParticipationBox: FC<ParticipationBoxProps> = ({participation, highlighted, refetch}) => {
    const ref = useRef<null | HTMLDivElement>(null)
    const [todayMatches, setTodayMatches] = useState<Match[]>([]);
    const [tomorrowMatches, setTomorrowMatches] = useState<Match[]>([]);
    //const color = colors[Math.floor(Math.random()*colors.length)];
    const color="pink";

    useEffect(() => {
        if (highlighted && ref.current) ref.current.scrollIntoView();
    }, [])

    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        setTodayMatches(participation.tournament.matches.filter((match) => (
            new Date(match.date).setHours(0,0,0,0) === today.setHours(0,0,0,0)
        )));
        setTomorrowMatches(participation.tournament.matches.filter((match) => (
            new Date(match.date).setHours(0,0,0,0) === tomorrow.setHours(0,0,0,0)
        )));
    }, [participation.tournament.matches]);

    return <Box 
        m="30px" 
        py="15px"
        ref={ref} 
        flex={['100%','100%','100%','45%']} 
        border={highlighted ? '5px solid #FBB6CE' : ''} 
        boxShadow={`0 0 .2rem #fff, 0 0 .2rem ${color}, 0 0 0.5rem ${color}, 0 0 0rem ${color}, 0 0 1rem ${color},inset 0 0 0rem ${color};`}
        bgColor="#1E2F3D"
    >
        <TournamentHeader participation={participation} tournament={participation.tournament}/>
        <Container py="30px" maxW="container.lg">
            <Flex mb="20px">
                <Text w="30%" fontSize="xl">Matchs du jour</Text>
                <Spacer />
                <Text w="30%" align='right'>Vos paris</Text>
            </Flex>
            {todayMatches.length ? todayMatches.map((match) => (
                <UserTournamentParticipationMatchItem refetch={refetch} participation={participation} key={match.id} match={match} />
            )) : <Center>[ . . . ]</Center>}
        </Container>
        <Container py="30px" maxW="container.lg">
            <Flex mb="20px">
                <Text w="30%" fontSize="xl">Matchs de demain</Text>
                <Spacer />
                <Text w="30%" align='right'>Vos paris</Text>
            </Flex>
            {tomorrowMatches.length ? tomorrowMatches.map((match) => (
                <UserTournamentParticipationMatchItem refetch={refetch} participation={participation} key={match.id} match={match} />
            )) : <Center>[ . . . ]</Center>}
        </Container>
        <Text textAlign="center" _hover={{cursor: 'pointer'}} textDecoration='underline' onClick={() => history.push(`/tournament/${participation.tournament.id}`)}> Voir tous les paris</Text>
    </Box>
}

export default ParticipationBox;
