import { Box, Container, Flex, FormControl, Heading, InputProps, Skeleton, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import getSubscription from '../../../api/subscriptions/getSubsciption';
import { useInput } from '../../../hooks/useInput';


interface AdminFieldBoxProps extends InputProps {
    label: string
}
const AdminFieldBox: FC<AdminFieldBoxProps> = (props) => {

    return <Flex w="100%">
        <Heading my="auto" fontSize="sm">{props.label}</Heading>
        <Box width="30px" />
        <FormControl isRequired={props.isRequired}>
            <Box w="100%" fontSize="sm">
                {props.children}
            </Box>
        </FormControl>
    </Flex>
}

export default AdminFieldBox;
