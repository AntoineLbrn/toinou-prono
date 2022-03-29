import { ChevronDownIcon, InfoIcon } from "@chakra-ui/icons";
import { Box, Menu, MenuButton, MenuList, Text, Tooltip } from "@chakra-ui/react";
import { FC } from "react"
import { Vote } from "../../models/Vote"
import betStatusAsColor from "../../utils/betStatusAsColor";
import betStatusAsTooltip from "../../utils/betStatusAsTooltip";

interface VoteResultProps {
    vote: Vote
    votable?: boolean
}

const VoteResult: FC<VoteResultProps> = ({vote, votable}) => {
    return <Tooltip label={betStatusAsTooltip(vote.bet.status)} aria-label='A tooltip'>
        <Box>
            {vote.bet.label} 
            <InfoIcon color={betStatusAsColor(vote.bet.status)}/>
            {votable && <ChevronDownIcon />}
        </Box>
    </Tooltip>
        
}

export default VoteResult