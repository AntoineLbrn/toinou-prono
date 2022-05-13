import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, HStack, Img, Menu, MenuButton, MenuItem, MenuList, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import getLoLEsportTournaments from "../../../api/lolesport/getLoLEsportTournaments";
import populateTournamentMatches from "../../../api/tournaments/populateTournamentMatches";
import populateTournamentMatchesResults from "../../../api/tournaments/populateTournamentMatchesResults";
import updateTournament from "../../../api/tournaments/updateTournament";
import { useInput } from "../../../hooks/useInput";
import { useMutationWithFeedback } from "../../../hooks/useMutationWithFeeback";
import LoLEsportLeague from "../../../models/LoLEsportLeague";
import Tournament from "../../../models/Tournament";
import AdminInput from "../form/AdminInput";
import AdminSubmitButton from "../form/AdminSubmitButton";

interface AdminEditExternalTournamentIdProps {
    tournament: Tournament
    refetch : () => void
}

const AdminEditExternalTournamentId: FC<AdminEditExternalTournamentIdProps> = ({ tournament, refetch }: AdminEditExternalTournamentIdProps) => {
    const {bind: bindId, setValue: setId, value: id, initialValue: initialId} = useInput(tournament.externalTournamentId);
    const [leagues, setLeagues] = useState<LoLEsportLeague[]>([]);
    const mutation = useMutationWithFeedback(() => updateTournament(
        {
            id: tournament.id,
            externalTournamentId: id
            
        }), {
        onSuccess: refetch
        },
        'Configuration mise à jour'
    );
return <Formik initialValues={{
    id: initialId, 
}} onSubmit={() => mutation.mutate()}>
    <Form>
        <VStack w="100%" spacing="10px">
            <AdminInput label="External Tournament Id" disabled input={bindId} />
            <HStack spacing="20px">
                <Button variant="outline" onClick={() => getLoLEsportTournaments().then((res) => setLeagues(res.data.leagues))}>Charger les compétitions LoLEsport</Button>
                <AdminSubmitButton isLoading={mutation.isLoading} />
                {tournament.externalTournamentId && <Menu>
                    <MenuButton type="button">
                        ⚙️<ChevronDownIcon />
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => populateTournamentMatches(tournament.id)}>
                            populate matches
                        </MenuItem>
                        <MenuItem onClick={() => populateTournamentMatchesResults(tournament.id)}>
                            populate results
                        </MenuItem>
                    </MenuList>
                </Menu>}
            </HStack>
            <VStack w="90%" spacing="10px">
                {leagues.map((league) => (
                    <Flex key={league.id} w="100%" _hover={{cursor: 'pointer', bgColor:'#1E2F3D'}} onClick={() => setId(league.id)}>
                        <Box mr="30px">
                            <Img w="100px" src={league.image} />
                        </Box>
                        <Heading size="lg" my="auto" flex="1">
                            {league.name}
                        </Heading>
                        <Box my="auto">
                            {league.id}
                        </Box>
                    </Flex>
                ))}
            </VStack>
        </VStack>
    </Form>
</Formik>
}

export default AdminEditExternalTournamentId;
