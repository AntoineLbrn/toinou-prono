import { MenuItem } from "@chakra-ui/react"
import { FC } from "react";
import createVote from "../../api/votes/createVote";
import { useMutationWithFeedback } from "../../hooks/useMutationWithFeeback";
import { Bet } from "../../models/Bet";

interface VoteItemProps {
    refetch: () => void
    bet: Bet
}

const VoteItem: FC<VoteItemProps> = ({bet, refetch}) => {
    const voteMutation = useMutationWithFeedback(() => createVote({betId: bet.id}),
    {
        onSuccess: refetch
    },
    'Vote enregistré'
    );

    return <MenuItem onClick={() => voteMutation.mutate()} >
        {bet.label}
    </MenuItem>
}

export default VoteItem;