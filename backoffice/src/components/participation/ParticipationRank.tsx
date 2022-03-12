import { Skeleton } from "@chakra-ui/react";
import { FC } from "react";
import { useQuery } from "react-query";
import getRank from "../../api/userTournamentParticipations/getRank";
import { UserTournamentParticipation } from "../../models/UserTournamentParticipation"
import CustomSkeleton from "../generic/CustomSkeleton";

interface ParticipationRankProps {
    tournamentId: string
}

const ParticipationRank: FC<ParticipationRankProps> = ({tournamentId}) => {
    const { data: rank, isLoading, error } = useQuery<Number>(
        `getRank${tournamentId}`,
        () => getRank(tournamentId)
    );

    return <CustomSkeleton display="inline" isLoaded={!isLoading} error={error}>
            {rank} <sup>th</sup>
        </CustomSkeleton> 
}

export default ParticipationRank;