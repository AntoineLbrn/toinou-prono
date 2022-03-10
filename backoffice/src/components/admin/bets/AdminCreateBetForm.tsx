import { Accordion, Box, Button, Container, Heading, HStack, Skeleton, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import createBet from '../../../api/bets/createBet';
import { useInput } from '../../../hooks/useInput';
import { useMutationWithFeedback } from '../../../hooks/useMutationWithFeeback';
import { Bet } from '../../../models/Bet';
import { Match } from '../../../models/Match';
import AdminInput from '../form/AdminInput';
import AdminSubmitButton from '../form/AdminSubmitButton';

interface AdminCreateBetFormProps {
    match: Match
    refetch: () => void
}
const AdminCreateBetForm: FC<AdminCreateBetFormProps> = ({ match, refetch }: AdminCreateBetFormProps) => {
    const {bind: bindLabel, setValue, value: label} = useInput('');
    const [formShown, setFormShown] = useState<boolean>(false);

    const mutation = useMutationWithFeedback(() => createBet(
        {
            label, 
            matchId: match.id,
        }),
        {
            onSuccess: () => {setFormShown(false); setValue(''); refetch();}
        },
        'Pari créé'
    );
    
    return formShown ?
    <Container maxW="container.xl">
        <Formik initialValues={{}} onSubmit={() => mutation.mutate()}>
                <Form>
                    <HStack w="100%" mt="50px" spacing="10px">
                        
                        <AdminInput required label="Titre du pari" input={bindLabel} />
                        <AdminSubmitButton w="100%" title="Ajouter" isLoading={mutation.isLoading} />                    </HStack>
                </Form>
            </Formik>
    </Container> : 
    <Button w='100%' mt='50px' onClick={() => setFormShown(true)}>Entrer un nouveau pari</Button>;
}

export default AdminCreateBetForm;
