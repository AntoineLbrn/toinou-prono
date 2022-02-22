import React, { FC } from 'react';
import { Box, BoxProps, forwardRef, HStack } from '@chakra-ui/react';

const AdminContent = forwardRef<BoxProps, 'div'>((props, ref) => (
    <HStack mt="30px" ml="20px" ref={ref} {...props}>
        <Box minW="22vw"/>
        {props.children}
    </HStack>
));

export default AdminContent;
