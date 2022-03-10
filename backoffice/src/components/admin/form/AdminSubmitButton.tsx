import { Box, Button, ButtonProps, Center, Container, Flex, FormControl, forwardRef, Heading, InputProps, Skeleton, Spinner, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import getSubscription from '../../../api/subscriptions/getSubsciption';
import { useInput } from '../../../hooks/useInput';


interface AdminSubmitButtonProps extends ButtonProps {
    title?: string
}
const AdminSubmitButton = forwardRef<AdminSubmitButtonProps, 'button'>((props: any, ref: any) => (
    <Center mt='30px'>
        {props.isLoading ? <Spinner /> : <Button width="75%" {...props} {...ref} type='submit'>{props.title || 'Valider'}</Button>}
    </Center>
));

export default AdminSubmitButton;
