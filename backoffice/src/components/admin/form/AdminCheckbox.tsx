import { Avatar, Box, Flex, forwardRef, FormControl, Heading, Input, InputProps, Switch, SwitchProps, CheckboxProps, Checkbox } from "@chakra-ui/react";
import { FC } from "react";
import AdminFieldBox from "./AdminFieldBox";

interface AdminCheckboxProps extends CheckboxProps {
    label: string
    input: {
        defaultChecked: boolean
        onChange: (event: any) => void
    }
}

const AdminCheckbox = forwardRef<AdminCheckboxProps, 'input'> (( props : AdminCheckboxProps, ref) => {

    return <AdminFieldBox {...props}>
        <Checkbox {...props} {...ref} {...props.input}/>
    </AdminFieldBox>
});

export default AdminCheckbox;
