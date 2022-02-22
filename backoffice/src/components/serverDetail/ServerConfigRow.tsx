import { Avatar, Box, Flex, FormControl, Heading, Input } from "@chakra-ui/react";
import { FC } from "react";

interface ServerConfigRowProps {
    label: string
    disabled: boolean
    input: {
        value: string
        onChange: (event: any) => void
    }
}

const ServerConfigRow: FC<ServerConfigRowProps> = ({label, input, disabled}: ServerConfigRowProps) => {
    return <Flex w="100%">
    <Heading my="auto" fontSize="sm">{label}</Heading>
    <FormControl isRequired>
        <Box ml="30px" w="100%" fontSize="sm"><Input isRequired={true} disabled={disabled} variant="flushed" fontSize="sm" {...input}/></Box>
    </FormControl>
</Flex>
}

export default ServerConfigRow;
