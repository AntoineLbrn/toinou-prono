import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Text, Box, Button, Center, Flex, Heading, HStack, Input, Kbd, Spacer, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { FC, useEffect } from "react";
import { useMutation } from "react-query";
import setupTournamentSubscription from "../../api/tournaments/setupTournamentSubscription";
import { useInput } from "../../hooks/useInput";
import ServerTournamentSubscription from "../../models/ServerTournamentSubscription";
import SchedulePronoForm from "./SchedulePronoForm";
import ServerConfigRow from "./ServerConfigRow";
import SetupConfigByDiscordModal from "./SetupConfigByDiscordModal";

interface TournamentItemProps {
    serverTournamentSubscription: ServerTournamentSubscription
    refetch: () => void;
}

const TournamentItem: FC<TournamentItemProps> = ({serverTournamentSubscription, refetch}: TournamentItemProps) => {
    const {onOpen, isOpen, onClose} = useDisclosure();
    const toast = useToast();
    const {bind: bindRole, value: role, initialValue: initialRole} = useInput(serverTournamentSubscription.bettorRoleLabel);
    const {bind: bindChannel, value: channel, initialValue: initialChannel} = useInput(serverTournamentSubscription.bettorChannelLabel);

    const mutation = useMutation(() => setupTournamentSubscription(role, channel, serverTournamentSubscription.id), {
        onError: (error: Error) => {toast({ title: error.message, status: 'error', isClosable: true})},
        onSuccess: onOpen
    });

    const isSubscriptionSetup = serverTournamentSubscription.bettorChannelLabel 
    && serverTournamentSubscription.bettorRoleLabel
    || mutation.isSuccess;

    return <AccordionItem borderColor="gray.200" py="10px">
        <AccordionButton>
            <Flex color="#ECE6D6" alignItems="center" w="100%">
                <Heading ml="20px" fontSize="lg">{serverTournamentSubscription.tournament.label} ({serverTournamentSubscription.tournament.description})</Heading>
                <Spacer />
                <AccordionIcon h="100%"/>
            </Flex>
        </AccordionButton>
        <AccordionPanel color="white" mt="20px" pb={4}>
            <Formik initialValues={{role: initialRole, channel: initialChannel}} onSubmit={() => mutation.mutate()}>
                <Form>
                    <VStack w="100%">
                        <ServerConfigRow label="Role" disabled={!!serverTournamentSubscription.bettorRoleLabel} input={bindRole} />
                        <ServerConfigRow label="Channel" disabled={!!serverTournamentSubscription.bettorChannelLabel} input={bindChannel} />
                        {!isSubscriptionSetup && <Button type="submit">{mutation.isLoading ? '...' : 'Valider'}</Button>}
                        {isSubscriptionSetup && <SchedulePronoForm refetch={refetch} subscription={serverTournamentSubscription} />}
                        {isSubscriptionSetup && <Text my="10px" ><Kbd fontSize="lg">/config {serverTournamentSubscription.tournament.label}</Kbd></Text>}
                    </VStack>
                </Form>
            </Formik>
        </AccordionPanel>
        <SetupConfigByDiscordModal tournamentName={serverTournamentSubscription.tournament.label} onClose={() => {refetch(); onClose()}} isOpen={isOpen} />
    </AccordionItem>
}

export default TournamentItem;
