import { Skeleton } from "@chakra-ui/react";
import { FC } from "react";
import { useQuery } from "react-query";
import getRank from "../../api/userTournamentParticipations/getRank";
import { UserTournamentParticipation } from "../../models/UserTournamentParticipation"

interface ParticipationRankProps {
    tournamentId: string
}

const ParticipationRank: FC<ParticipationRankProps> = ({tournamentId}) => {
    const { data: rank, isLoading } = useQuery<Number>(
        `getRank${tournamentId}`,
        () => getRank(tournamentId)
    );

    return <Skeleton display="inline" isLoaded={!isLoading}>
            {rank} <sup>th</sup>
        </Skeleton> 
}

export default ParticipationRank;