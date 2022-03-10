import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Text, Tooltip } from "@chakra-ui/react";
import { FC } from "react";
import { Match } from "../../models/Match";

interface MatchTitleProps {
    match: Match
}

const MatchTitle: FC<MatchTitleProps> = ({match}) => (
    <Text w="30%" ml="10px">{match.label} {match.description && <Tooltip label={match.description} aria-label='A tooltip'><InfoOutlineIcon /></Tooltip>}</Text>
)

export default MatchTitle