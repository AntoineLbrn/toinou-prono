import { Button, useDisclosure } from "@chakra-ui/react"
import { FC } from "react"
import { FaTrash } from "react-icons/fa";
import deleteMatch from "../../../api/matches/deleteMatch";
import { useMutationWithFeedback } from "../../../hooks/useMutationWithFeeback";
import { Match } from "../../../models/Match";
import AdminConfirmMatchDeletionModal from "../../generic/ConfirmDeletionModal";

interface AdminDeleteMatchButtonProps {
    refetch: () => void
    match: Match
}

const AdminDeleteMatchButton:FC<AdminDeleteMatchButtonProps> = ({refetch, match} : AdminDeleteMatchButtonProps) => {
    const {onOpen, isOpen, onClose} = useDisclosure();
    const mutation = useMutationWithFeedback(() => deleteMatch(match.id),
        {
            onSuccess: refetch
        },
        'Match supprimé'
    );
    return <>
        <Button textAlign="center" onClick={(e) => {e.stopPropagation(); onOpen();}} colorScheme='red' variant="solid"><FaTrash /></Button>
        <AdminConfirmMatchDeletionModal isOpen={isOpen} label={match.label} onClose={onClose} onConfirm={() => mutation.mutate()} />
    </>
};

export default AdminDeleteMatchButton;
