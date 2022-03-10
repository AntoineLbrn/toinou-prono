import { Avatar, Box, Flex, forwardRef, FormControl, Heading, Input, InputProps, Select } from "@chakra-ui/react";
import { FC } from "react";
import AdminFieldBox from "./AdminFieldBox";

interface AdminMinutesSelectProps extends InputProps {
    label: string
    input: {
        value: string
        onChange: (event: any) => void
    }
}

const AdminMinutesSelect = forwardRef<AdminMinutesSelectProps, 'input'> (( props : AdminMinutesSelectProps, ref) => {

    return <AdminFieldBox {...props}>
        <Select {...ref} {...props.input}>
            <option value="0">00</option>
            <option value="5">05</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="35">35</option>
            <option value="40">40</option>
            <option value="45">45</option>
            <option value="50">50</option>
            <option value="55">55</option>
        </Select>
    </AdminFieldBox>
});

export default AdminMinutesSelect;
