import { MenuItem } from "@chakra-ui/react"
import { FC } from "react";
import sendVote from "../../api/votes/sendVote";
import { useMutationWithFeedback } from "../../hooks/useMutationWithFeeback";
import { Bet } from "../../models/Bet";

interface VoteItemProps {
    refetch: () => void
    bet: Bet
}

const VoteItem: FC<VoteItemProps> = ({bet, refetch}) => {
    const voteMutation = useMutationWithFeedback(() => sendVote({betId: bet.id}),
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