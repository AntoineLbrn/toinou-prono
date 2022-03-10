import { Button, ButtonProps, forwardRef } from "@chakra-ui/react";
import createUserTournamentParticipation from "../../api/userTournamentParticipations/createUserTournamentParticipation";
import { useMutationWithFeedback } from "../../hooks/useMutationWithFeeback";
import Tournament from "../../models/Tournament";

interface JoinTournamentButtonProps extends ButtonProps {
    tournamentId: string
    refetch: () => void
}

const JoinTournamentButton = forwardRef<JoinTournamentButtonProps, 'button'>(({tournamentId, refetch, ...props}: JoinTournamentButtonProps, ref) => {
    const mutation = useMutationWithFeedback(
        () => createUserTournamentParticipation({tournamentId}),
        {
            onSuccess: refetch
        },
        'Tu as rejoint la compétition avec succès'
    )
    
    return <Button onClick={() => mutation.mutate()} {...props} ref={ref}>
        Rejoindre la compétition
    </Button>
});

export default JoinTournamentButton;