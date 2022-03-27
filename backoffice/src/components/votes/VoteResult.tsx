import { ChevronDownIcon, InfoIcon } from "@chakra-ui/icons";
import { Box, Menu, MenuButton, MenuList, Tooltip } from "@chakra-ui/react";
import { FC } from "react"
import { Bet } from "../../models/Bet";
import { Match } from "../../models/Match"
import { Vote } from "../../models/Vote"
import betStatusAsColor from "../../utils/betStatusAsColor";
import betStatusAsTooltip from "../../utils/betStatusAsTooltip";
import VoteItem from "./VoteItem";

interface VoteResultProps {
    vote: Vote | undefined
    votable: boolean
    refetch: () => void
    availableBets: Bet[]
}

const VoteResult: FC<VoteResultProps> = ({vote, votable, refetch, availableBets }) => {
    return vote ? 
            <Tooltip label={betStatusAsTooltip(vote.bet.status)} aria-label='A tooltip'>
                <Box>{vote.bet.label} <InfoIcon color={betStatusAsColor(vote.bet.status)}/></Box>
            </Tooltip> 
            : votable ? 
            <Menu>
                <MenuButton fontWeight="bold" color="black" fontSize="xl" bgColor="#85D5D7" rounded="md" px='15px' sx={{ fontVariant: 'small-caps' }} > voter <ChevronDownIcon /> </MenuButton>
                <MenuList>
                    {availableBets.map((bet) => (
                        <VoteItem refetch={refetch} bet={bet} key={bet.id}></VoteItem>
                    ))}
                </MenuList>
            </Menu>
            : <>trop tard</>
}

export default VoteResult