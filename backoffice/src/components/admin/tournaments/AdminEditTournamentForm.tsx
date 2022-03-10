import { Box, Button, Container, Flex, Heading, HStack, Icon, Skeleton, Spacer, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, useCheckbox, useToast, VStack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useInput } from '../../../hooks/useInput';
import { useMutationWithFeedback } from '../../../hooks/useMutationWithFeeback';
import AdminInput from '../form/AdminInput';
import AdminSubmitButton from '../form/AdminSubmitButton';
import Tournament from '../../../models/Tournament';
import updateTournament from '../../../api/tournaments/updateTournament';
import ChakraCustomFieldset from '../form/CustomFieldset';
import ChakraCustomLegend from '../form/CustomLegend';
import AdminMatchList from '../matches/AdminMatchList';
import AdminMatchDisplayer from '../matches/AdminMatchDisplayer';

interface AdminSubscriptionFormProps {
    tournament: Tournament
    refetch: () => void
}

const AdminEditTournamentForm: FC<AdminSubscriptionFormProps> = ({ tournament, refetch }: AdminSubscriptionFormProps) => {
    const {bind: bindLabel, value: label, initialValue: initialLabel} = useInput(tournament.label);
    const {bind: bindDescription, value: description, initialValue: initialDescription} = useInput(tournament.description);
    const mutation = useMutationWithFeedback(() => updateTournament(
        {
            id: tournament.id,
            label: label, 
            description: description, 
        }), {
        onSuccess: refetch
        },
        'Configuration mise à jour'
    );

    
    return <Container maxW="container.xl">
        <ChakraCustomFieldset border="1px solid pink" padding="10px">
            <ChakraCustomLegend ml="50px" px='5px'>
                <Heading size='lg' mb="15px" color="pink.200"> Tournoi </Heading>
            </ChakraCustomLegend>
            <Formik initialValues={{
                label: initialLabel, 
            }} onSubmit={() => mutation.mutate()}>
                <Form>
                    <VStack w="100%" spacing="10px">
                        <AdminInput label="Label" input={bindLabel} />
                        <AdminInput label="Description" input={bindDescription} />
                    </VStack>
                    <AdminSubmitButton isLoading={mutation.isLoading}/>
                </Form>
            </Formik>
        </ChakraCustomFieldset>
        <ChakraCustomFieldset border="1px solid pink" padding="10px">
            <ChakraCustomLegend ml="50px" px='5px'>
                <Heading size='lg' mb="15px" color="pink.200"> Matchs </Heading>
            </ChakraCustomLegend>
            <AdminMatchDisplayer refetch={refetch} tournament={tournament}/>
        </ChakraCustomFieldset>
  </Container>;
}

export default AdminEditTournamentForm;
