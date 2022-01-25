import { Alert, AlertDescription, Box, Heading } from '@chakra-ui/react';
import React, { FC } from 'react';

interface AdminErrorProps {
    message: string;
}

const AdminError: FC<AdminErrorProps> = ({message}: AdminErrorProps) => {

    return <Box width="100%" height="100%">
        <Alert status='error'>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
    </Box>
}

export default AdminError;
