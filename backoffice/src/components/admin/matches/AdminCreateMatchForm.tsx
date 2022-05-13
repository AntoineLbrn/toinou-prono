import { Box, Button, Checkbox, Container, Heading, HStack, Skeleton, Switch, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, useBoolean, useCheckbox, useToast, VStack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useMutation, } from 'react-query';
import createTournament from '../../../api/tournaments/createTournament';
import { useInput } from '../../../hooks/useInput';
import { useMutationWithFeedback } from '../../../hooks/useMutationWithFeeback';
import AdminInput from '../form/AdminInput';
import AdminSubmitButton from '../form/AdminSubmitButton';
import Tournament from '../../../models/Tournament';
import createMatch from '../../../api/matches/createMatch';
import "react-datepicker/dist/react-datepicker.css";
import AdminDatePicker from '../form/AdminDatePicker';
import AdminFieldBox from '../form/AdminFieldBox';
import setDateToMidnight from '../../../utils/setDateToMidnight';

interface AdminCreateMatchFormProps {
    refetch: () => void
    tournament: Tournament
}

const AdminCreateMatchForm: FC<AdminCreateMatchFormProps> = ({refetch, tournament}) => {
    const {bind: bindLabel, value: label} = useInput('');
    const {bind: bindDescription, value: description} = useInput('');
    const [manualVoteClosing, {toggle}] = useBoolean(false);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [date, setDate] = useState(tomorrow);

    const mutation = useMutationWithFeedback(() => createMatch(
        {
            label, 
            description,
            manualVoteClosing,
            tournamentId: tournament.id,
            date: setDateToMidnight(date),
        }),
        {
            onSuccess: refetch
        },
        'Match créé'
    );
    
    return <Container maxW="container.xl">
        <Formik initialValues={{}} onSubmit={() => mutation.mutate()}>
                <Form>
                    <VStack mt="20px" spacing="10px">
                        <AdminInput required label="Titre du match ⚔️" input={bindLabel} />
                        <AdminFieldBox label={'Date'} >
                            <AdminDatePicker p="3px" _hover={{cursor: "pointer", backgroundColor:"#2F3G4E" }} bgColor="#1E2F3D" selected={date} onChange={(date:Date) => setDate(date)} />
                        </AdminFieldBox>
                        <AdminInput label="Description" input={bindDescription} />
                        <AdminFieldBox label='Clore les votes manuellement' >
                            <Checkbox isChecked={manualVoteClosing} onChange={toggle} />
                        </AdminFieldBox>
                        <AdminSubmitButton w="100%" title="Ajouter un match" isLoading={mutation.isLoading} />                    
                    </VStack>
                </Form>
            </Formik>
  </Container>;
}

export default AdminCreateMatchForm;
