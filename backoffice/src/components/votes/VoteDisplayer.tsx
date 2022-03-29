import { ChevronDownIcon, InfoIcon } from "@chakra-ui/icons";
import { Box, Menu, MenuButton, MenuList, Text, Tooltip } from "@chakra-ui/react";
import { FC } from "react"
import { Bet } from "../../models/Bet";
import { Vote } from "../../models/Vote"
import betStatusAsColor from "../../utils/betStatusAsColor";
import betStatusAsTooltip from "../../utils/betStatusAsTooltip";
import VoteItem from "./VoteItem";
import VoteResult from "./VoteResult";

interface VoteResultProps {
    vote: Vote | undefined
    votable: boolean
    refetch: () => void
    availableBets: Bet[]
}

const VoteDisplayer: FC<VoteResultProps> = ({vote, votable, refetch, availableBets }) => {
    return votable ? <Menu>
        {!vote 
            ? <MenuButton fontWeight="bold" color="black" fontSize="xl" bgColor="#85D5D7" rounded="md" px='15px' sx={{ fontVariant: 'small-caps' }} > voter <ChevronDownIcon /> </MenuButton>
            : <MenuButton><VoteResult votable={true} vote={vote} /></MenuButton>
        }
        <MenuList>
            {availableBets.map((bet) => (
                <VoteItem refetch={refetch} bet={bet} key={bet.id}></VoteItem>
            ))}
        </MenuList>
    </Menu> : vote 
        ? <VoteResult vote={vote} />
        : <Text>Trop tard</Text>
}

export default VoteDisplayer