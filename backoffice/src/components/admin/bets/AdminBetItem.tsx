import { ChevronDownIcon, InfoIcon } from '@chakra-ui/icons';
import { Accordion, Center, Text, Heading, Menu, MenuButton, MenuItem, MenuList, Skeleton, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, VStack, useDisclosure } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import deleteBet from '../../../api/bets/deleteBet';
import updateBet from '../../../api/bets/updateBet';
import validateBetAndInvalidateOthers from '../../../api/bets/validateBetAndInvalidateOthers';
import { useMutationWithFeedback } from '../../../hooks/useMutationWithFeeback';
import { Bet, BetStatus } from '../../../models/Bet';
import { Match } from '../../../models/Match';
import betStatusAsColor from '../../../utils/betStatusAsColor'
import ConfirmDeletionModal from '../../generic/ConfirmDeletionModal';

interface AdminAvailableBetListProps {
    bet: Bet
    refetch: () => void
}
const AdminBetItem: FC<AdminAvailableBetListProps> = ({ bet, refetch }: AdminAvailableBetListProps) => {
    const updateStatusMutation = useMutation((status: BetStatus) => updateBet(
        {
            id: bet.id,
            status
        }),
        {
            onSuccess: refetch
        }
    );
    const validateBetAndInvalidateOthersMutation = useMutationWithFeedback(() => validateBetAndInvalidateOthers(bet.id),
        {
            onSuccess: refetch
        },
        'Modification des paris effectuée'
    );
    const deleteBetMutation = useMutationWithFeedback(() => deleteBet(bet.id),
        {
            onSuccess: refetch
        },
        'Pari supprimé'
    );

    const {isOpen, onClose, onOpen} = useDisclosure();

    return <Center w="32%">
        <Menu>
            <MenuButton >
                <Text fontWeight="bold">{bet.label} <InfoIcon color={betStatusAsColor(bet.status)}/><ChevronDownIcon /></Text>
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => validateBetAndInvalidateOthersMutation.mutate()}>Valider le pari et invalider les autres</MenuItem>
                <MenuItem onClick={() => updateStatusMutation.mutate(BetStatus.WON)}>Valider le pari</MenuItem>
                <MenuItem onClick={() => updateStatusMutation.mutate(BetStatus.PENDING)}>Mettre le pari "en cours"</MenuItem>
                <MenuItem onClick={() => updateStatusMutation.mutate(BetStatus.LOST)}>Mettre le pari perdant</MenuItem>
                <MenuItem onClick={onOpen}>Supprimer le pari</MenuItem>
            </MenuList>
            <ConfirmDeletionModal isOpen={isOpen} onClose={onClose} onConfirm={() => deleteBetMutation.mutate()} label={bet.label} />
        </Menu>
    </Center>
}

export default AdminBetItem;
