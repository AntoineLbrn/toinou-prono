import { Avatar, Box, Flex, forwardRef, FormControl, Heading, Input, InputProps } from "@chakra-ui/react";
import { FC } from "react";
import AdminFieldBox from "./AdminFieldBox";

interface AdminInputProps extends InputProps {
    label: string
    input: {
        value: string
        onChange: (event: any) => void
    }
}

const AdminInput = forwardRef<AdminInputProps, 'input'> (( props : AdminInputProps, ref) => {

    return <AdminFieldBox {...props}>
        <Input variant="flushed" fontSize="sm" {...props} {...ref} {...props.input}/>
    </AdminFieldBox>
});

export default AdminInput;
