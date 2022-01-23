import React, { FC } from 'react';
import { BoxProps, Container, forwardRef, Heading } from '@chakra-ui/react';

const AdminMenuHeading = forwardRef<BoxProps, 'div'>((props, ref) => (
    <Container >
        <Heading
            textAlign="left"   
            display="inline-flex" 
            alignItems="center" 
            fontWeight="600" 
            fontSize="lg" 
            color="#ECE6D6"                 
            ref={ref} 
        {...props} />
    </Container>
));

export default AdminMenuHeading;
