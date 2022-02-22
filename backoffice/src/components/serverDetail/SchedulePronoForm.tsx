import { FormControl, FormLabel, Switch, useToast } from "@chakra-ui/react";
import { FC } from "react";
import { useMutation } from "react-query";
import changeSubscriptionAutoPostValue from "../../api/tournaments/changeSubscriptionAutoPostValue";
import ServerTournamentSubscribtion from "../../models/ServerTournamentSubscription";

interface SchedulePronoFormProps {
    subscription: ServerTournamentSubscribtion
    refetch: () => void
}

const SchedulePronoForm: FC<SchedulePronoFormProps> = ({ subscription, refetch }: SchedulePronoFormProps) => {
    const toast = useToast();
    const mutation = useMutation(() => changeSubscriptionAutoPostValue(subscription.id, !subscription.shouldAutoPostBets), {
        onError: (error: Error) => {toast({ title: error.message, status: 'error', isClosable: true})},
        onSuccess: refetch
    });

    return <FormControl display='flex' alignItems='center'>
    <FormLabel htmlFor='auto-bet' mt="30px" mb='0'>
        Poster automatiquement les pronostics du lendemain (20h UTC+1)
    </FormLabel>
    <Switch mt="30px" isDisabled={mutation.isLoading} onChange={() => mutation.mutate()} isChecked={subscription.shouldAutoPostBets} id='auto-bet' />
  </FormControl>
}

export default SchedulePronoForm;
