import { Accordion, Box, Container, Flex, Heading, Skeleton, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Match } from '../../../models/Match';
import Tournament from '../../../models/Tournament';
import { AdminEditTournamentContext } from '../tournaments/AdminEditTournamentContext';
import AdminCreateMatchForm from './AdminCreateMatchForm';
import AdminMatchList from './AdminMatchList';

interface AdminMatchDisplayerProps {
    tournament: Tournament
    refetch: () => void
}
const AdminMatchDisplayer: FC<AdminMatchDisplayerProps> = ({ tournament, refetch }: AdminMatchDisplayerProps) => {
    const [futurMatches, setFuturMatches] = useState<Match[]>([]);
    const [pastMatches, setPastMatches] = useState<Match[]>([]);
    const { displayerOpened, setDisplayerOpened } = useContext(AdminEditTournamentContext)

    const options = [
        {
            label: 'Matchs en cours',
            component: <AdminMatchList refetch={refetch} matches={futurMatches}/>
        },
        {
            label: 'Matchs passés',
            component: <AdminMatchList refetch={refetch} matches={pastMatches}/>
        },
        {
            label: 'Ajouter un match',
            component: <AdminCreateMatchForm refetch={refetch} tournament={tournament}/>
        }
    ];

    useEffect(() => {
        const today = new Date();
        setFuturMatches(tournament.matches.filter((match) => new Date(match.date) >= today).sort((match1, match2) => new Date(match1.date).valueOf() - new Date(match2.date).valueOf()));
        setPastMatches(tournament.matches.filter((match) => new Date(match.date) < today).sort((match1, match2) => new Date(match2.date).valueOf() - new Date(match1.date).valueOf()));
    }, [tournament.matches]);

    return  <>
        <Flex w="100%" textAlign="center">
            {options.map((option) => {
                const selected = displayerOpened === option.label;
                return <Box 
                    key={option.label}
                    flex='1' 
                    rounded="md"
                    border="1px solid #394d5e"
                    bgColor={selected ? "#1E2F3D" : "inherit"}
                    py="9px"
                    fontSize="xl"
                    _hover={{cursor: 'pointer', bgColor: selected ? "#1E2F3D" : "#394d5e"}} 
                    onClick={() => setDisplayerOpened(option.label)}
                >
                    {option.label}
                </Box>
            })}
        </Flex>
    {options.find((option) => option.label === displayerOpened)?.component}
</>
}

export default AdminMatchDisplayer;
