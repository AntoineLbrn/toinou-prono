import React, { FC } from 'react';
import { BoxProps, Container, forwardRef, Heading } from '@chakra-ui/react';
import history from '../../utils/history';

interface AdminMenuSubHeadingProps extends BoxProps {
    path: string;
}

const AdminMenuSubHeading = forwardRef<AdminMenuSubHeadingProps, 'div'>((props, ref) => {
    const futurPath = `/admin/${props.path}`;
    const isCurrentlyOnThisMenu = history.location.pathname === futurPath;

    return <Container  _hover={{cursor: "pointer"}} onClick={() => history.push(futurPath)}>
        <Heading
            _hover={{cursor: "pointer", textDecoration: "underline #20FCFF", }}
            textDecoration={isCurrentlyOnThisMenu ? "underline #20FCFF" : 'none'}
            textUnderlineOffset="3px"
            pb="5px"
            borderBottom="1px solid transparent"
            fontWeight="500" 
            fontSize="md" 
            color="#ECE6D6"                 
            ref={ref} 
        {...props} />
    </Container>
});

export default AdminMenuSubHeading;
