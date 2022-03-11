import { InfoIcon, UpDownIcon } from "@chakra-ui/icons";
import { Box, Tooltip, Text, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react"
import { Bet, BetStatus } from "../../models/Bet";
import { Match } from "../../models/Match"
import { Vote } from "../../models/Vote"
import betStatusAsColor from "../../utils/betStatusAsColor";
import betStatusAsTooltip from "../../utils/betStatusAsTooltip";

interface BetResultProps {
    match: Match
}

const BetResult: FC<BetResultProps> = ({match}) => {
    return <Menu>
        <MenuButton >
            <Tooltip label={betStatusAsTooltip(BetStatus.WON)}>
                <Text fontWeight="bold">
                    {match.bets.length} paris <UpDownIcon />    
                </Text>
            </Tooltip>
        </MenuButton>
        <MenuList>
            {match.bets.map((bet) => (
                <MenuItem key={bet.id}>{bet.label}  <InfoIcon ml='5px' color={betStatusAsColor(bet.status)} /></MenuItem>
            ))}
        </MenuList>
    </Menu>
}

export default BetResult