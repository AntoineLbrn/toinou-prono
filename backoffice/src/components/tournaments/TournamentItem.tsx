import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Button, Flex, Heading, HStack, Link, Spacer, Td, Tr, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import addServer from "../../api/servers/addServer";
import DiscordServerAggregated from "../../models/DiscordServerAggregated";
import { canInviteBot } from "../../utils/permissions";
import { CheckCircleIcon } from '@chakra-ui/icons'
import Tournament from "../../models/Tournament";
import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import history from '../../utils/history'
import JoinTournamentButton from "./JoinTournamentButton";

interface TournamentItemProps {
    tournament: Tournament
    participations: UserTournamentParticipation[]
    refetch: () => void
}

const TournamentItem: FC<TournamentItemProps> = ({tournament, participations, refetch}: TournamentItemProps) => {
    const isTournamentAlreadyJoined = !!participations?.find((participation) => participation.tournament.id === tournament.id);

    return <Tr onClick={() => history.push(`/tournament/${tournament.id}`)} _hover={{cursor: 'pointer', bgColor:'#283c4d'}}>
    <Td>{tournament.label}</Td>
    <Td>{tournament.description}</Td>
    <Td>{tournament.matches.length}</Td>
    <Td>{tournament.participations.length}</Td>
    <Td onClick={(e) => e.stopPropagation()}>
        {isTournamentAlreadyJoined ?
        <Link color='cyan.300' onClick={() => history.push(`/my-bets/${tournament.id}`)}>Voir mes paris</Link>    
        : <JoinTournamentButton refetch={refetch} tournamentId={tournament.id}/>
    }
    </Td>
</Tr>
}

export default TournamentItem;
