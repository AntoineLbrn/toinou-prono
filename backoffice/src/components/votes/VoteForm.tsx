import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList, Text, Tooltip } from "@chakra-ui/react";
import { FC } from "react";
import { Bet } from "../../models/Bet";
import VoteItem from "./VoteItem";

interface VoteFormProps {
    refetch: () => void
    availableBets: Bet[]
}

const VoteForm: FC<VoteFormProps> = ({refetch, availableBets}) => {

    return <Menu>
        <MenuButton fontWeight="bold" color="black" fontSize="xl" bgColor="#85D5D7" rounded="md" px='15px' sx={{ fontVariant: 'small-caps' }} > voter <ChevronDownIcon /> </MenuButton>
        <MenuList>
            {availableBets.map((bet) => (
                <VoteItem refetch={refetch} bet={bet} key={bet.id}></VoteItem>
            ))}
        </MenuList>
    </Menu>
}

export default VoteForm