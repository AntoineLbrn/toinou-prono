import { Box, Button, Container, Skeleton, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, useCheckbox, useToast, VStack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import updateSubscription from '../../../api/subscriptions/updateSubscription';
import setupTournamentSubscription from '../../../api/tournaments/setupTournamentSubscription';
import { useInput } from '../../../hooks/useInput';
import { useMutationWithFeedback } from '../../../hooks/useMutationWithFeeback';
import { useBooleanInput } from '../../../hooks/useBooleanInput';
import ServerTournamentSubscribtion from '../../../models/ServerTournamentSubscription';
import ServerConfigRow from '../../serverDetail/ServerConfigRow';
import AdminInput from '../form/AdminInput';
import AdminSubmitButton from '../form/AdminSubmitButton';
import AdminSwitch from '../form/AdminCheckbox';
import AdminCheckbox from '../form/AdminCheckbox';
import AdminHourSelect from '../form/AdminHourSelect';
import AdminMinutesSelect from '../form/AdminMinutesSelect';

interface AdminSubscriptionFormProps {
    subscription: ServerTournamentSubscribtion
    refetch: () => void
}

const AdminSubscriptionForm: FC<AdminSubscriptionFormProps> = ({ subscription, refetch }: AdminSubscriptionFormProps) => {
    const {bind: bindRole, value: role, initialValue: initialRole} = useInput(subscription.bettorRoleLabel);
    const {bind: bindRoleId, value: roleId, initialValue: initialRoleId} = useInput(subscription.bettorRoleId);
    const {bind: bindChannel, value: channel, initialValue: initialChannel} = useInput(subscription.bettorChannelLabel);
    const {bind: bindChannelId, value: channelId, initialValue: initialChannelId} = useInput(subscription.bettorChannelId);
    const {bind: bindAutopost, value: autopost, initialValue: initialAutopost} = useBooleanInput(subscription.shouldAutoPostBets);
    const {bind: bindAutopostHour, value: autopostHour, initialValue: initialAutopostHour} = useInput(subscription.autoPostBetsHour);
    const {bind: bindAutopostMinutes, value: autopostMinutes, initialValue: initialAutopostMinutes} = useInput(subscription.autoPostBetsMinutes);
    const mutation = useMutationWithFeedback(() => updateSubscription(
        {
            bettorRoleLabel: role, 
            bettorRoleId: roleId,
            bettorChannelLabel: channel, 
            bettorChannelId: channelId, 
            shouldAutoPostBets: autopost,
            autoPostBetsHour: autopostHour,
            autoPostBetsMinutes: autopostMinutes,
            id: subscription.id
        }), {
        onSuccess: refetch
        },
        'Configuration mise à jour'
    );
    
    return <Container maxW="container.xl">
        <Formik initialValues={{
            role: initialRole, 
            roleId: initialRoleId, 
            channel: initialChannel, 
            channelId: initialChannelId, 
            shouldAutopostBets: initialAutopost,
            autopostHour: initialAutopostHour,
            autopostMinutes: initialAutopostMinutes,
        }} onSubmit={() => mutation.mutate()}>
                <Form>
                    <VStack w="100%" spacing="10px">
                        <AdminInput label="Role" input={bindRole} />
                        <AdminInput label="RoleID" input={bindRoleId} />
                        <AdminInput label="Channel" input={bindChannel} />
                        <AdminInput label="ChannelID" input={bindChannelId} />
                        <AdminCheckbox label="Autopost" input={bindAutopost}/>
                        <AdminHourSelect label="Heures de post" input={bindAutopostHour} />
                        <AdminMinutesSelect label="Minutes de post" input={bindAutopostMinutes} />
                    </VStack>
                    <AdminSubmitButton isLoading={mutation.isLoading}/>
                </Form>
            </Formik>
  </Container>;
}

export default AdminSubscriptionForm;
