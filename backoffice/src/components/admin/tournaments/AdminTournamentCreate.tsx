import { Box, Button, Container, Heading, Skeleton, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, useCheckbox, useToast, VStack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useMutation, } from 'react-query';
import createTournament from '../../../api/tournaments/createTournament';
import { useInput } from '../../../hooks/useInput';
import { useMutationWithFeedback } from '../../../hooks/useMutationWithFeeback';
import AdminInput from '../form/AdminInput';
import AdminSubmitButton from '../form/AdminSubmitButton';
import history from '../../../utils/history';
import Tournament from '../../../models/Tournament';

const AdminTournamentCreate: FC = () => {
    const {bind: bindLabel, value: label} = useInput('');
    const {bind: bindDescription, value: description} = useInput('');
    const mutation = useMutationWithFeedback(() => createTournament(
        {
            label, 
            description,
        }),
        {
            onSuccess: (tournament: Tournament) => history.push(`/admin/tournaments/edit/${tournament.id}`)
        },
        'Tournoi créé'
    );
    
    return <Container maxW="container.xl">
        <Heading my="50px" textAlign="center">Créer une nouvelle compétition</Heading>
        <Formik initialValues={{}} onSubmit={() => mutation.mutate()}>
                <Form>
                    <VStack w="100%" spacing="10px">
                        <AdminInput required label="Titre de la compétition" input={bindLabel} />
                        <AdminInput required label="Description" input={bindDescription} />
                    </VStack>
                    <AdminSubmitButton isLoading={mutation.isLoading}/>
                </Form>
            </Formik>
  </Container>;
}

export default AdminTournamentCreate;
