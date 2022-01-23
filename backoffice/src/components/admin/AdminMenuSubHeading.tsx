import React, { FC } from 'react';
import { BoxProps, Container, forwardRef, Heading } from '@chakra-ui/react';

const AdminMenuSubHeading = forwardRef<BoxProps, 'div'>((props, ref) => (
    <Container  _hover={{cursor: "pointer"}}>
        <Heading
            _hover={{cursor: "pointer", textDecoration: "underline #20FCFF", textUnderlineOffset:"3px"}}
            pb="5px"
            borderBottom="1px solid transparent"
            fontWeight="500" 
            fontSize="md" 
            color="#ECE6D6"                 
            ref={ref} 
        {...props} />
    </Container>
));

export default AdminMenuSubHeading;
