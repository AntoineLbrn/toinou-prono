import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Button, Center, Flex, Heading, HStack, Input, Spacer, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { Match } from "../../../models/Match";
import { CalendarIcon } from '@chakra-ui/icons'
import AdminAvailableBetList from "../bets/AdminAvailableBetList";
import AdminCreateBetForm from "../bets/AdminCreateBetForm";
import { useMutationWithFeedback } from "../../../hooks/useMutationWithFeeback";
import closeVotes from "../../../api/matches/closeVotes";

interface AdminMatchItemProps {
    match: Match;
    refetch: () => void;
}

const AdminMatchItem: FC<AdminMatchItemProps> = ({match, refetch}: AdminMatchItemProps) => {
    const date =  new Date(match.date).toLocaleDateString('fr', {weekday: 'long', day: 'numeric', month: 'long' }); 
    const closeVotesMutation = useMutationWithFeedback(() => closeVotes(match.id),
        {
            onSuccess: refetch
        },
        'Cloture des votes effectuée'
    );

    return <AccordionItem borderColor="gray.200" py="10px">
        <AccordionButton>
            <Flex color="#ECE6D6" alignItems="center" w="100%">
                <Flex w="70%">
                    <Heading flex="1" ml="20px" fontSize="lg">{match.label}</Heading>
                    <Heading flex="1" fontSize="md" fontWeight="500" ><CalendarIcon mx="10px" />{date}</Heading>
                    <Heading flex="1" fontSize="md" fontWeight="500" >{match.bets.length} paris possibles</Heading>
                </Flex>
                {match.manualVoteClosing && !match.isVoteClosed && <Button onClick={() => closeVotesMutation.mutate()} flex="1"> Clore les votes</Button>}
                <Spacer />
                <AccordionIcon h="100%"/>
            </Flex>
        </AccordionButton>
        <AccordionPanel color="white" mt="20px" pb={4}>
            <AdminAvailableBetList refetch={refetch} bets={match.bets}/>
            <AdminCreateBetForm match={match} refetch={refetch}/>
        </AccordionPanel>
    </AccordionItem>
}

export default AdminMatchItem;
