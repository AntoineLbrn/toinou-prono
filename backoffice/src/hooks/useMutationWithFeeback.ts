import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";

export const useMutationWithFeedback = (mutationFn: any, options?: any, successMessage?: string) => {
    const toast = useToast();

    const mutation = useMutation(() => mutationFn(), {
        ...options,
        onError: (error: Error) => {
          if (options && options.onError) {
            options.onError(error);
          } 
          toast({ title: error.message, status: 'error', isClosable: true})
        },
        onSuccess: (feedback: any) => {
          if (options && options.onSuccess) {
            options.onSuccess(feedback); 
          } 
          if (successMessage) {
            toast({title: successMessage, status: 'success', isClosable: true})
          }
        }
    });

  return mutation
};