import { InfoIcon } from "@chakra-ui/icons";
import { Box, Tooltip } from "@chakra-ui/react";
import { FC } from "react"
import { Match } from "../../models/Match"
import { Vote } from "../../models/Vote"
import betStatusAsColor from "../../utils/betStatusAsColor";
import betStatusAsTooltip from "../../utils/betStatusAsTooltip";

interface VoteResultProps {
    vote: Vote
}

const VoteResult: FC<VoteResultProps> = ({vote}) => {
    return <Tooltip label={betStatusAsTooltip(vote.bet.status)} aria-label='A tooltip'>
        <Box>{vote.bet.label} <InfoIcon color={betStatusAsColor(vote.bet.status)}/></Box>
    </Tooltip>
}

export default VoteResult