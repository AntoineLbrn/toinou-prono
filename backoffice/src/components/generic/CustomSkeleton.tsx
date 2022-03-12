import { Code, forwardRef, Skeleton, SkeletonProps } from "@chakra-ui/react";

interface CustomSkeletonProps extends SkeletonProps{
    error: any
}

const CustomSkeleton = forwardRef<CustomSkeletonProps,'div'>((props, ref) => (
    <Skeleton {...props} ref={ref}>
        {props.error ? 
            <Code w="100%" bg="red.200" color="red.800" >Erreur : {props.error.message}</Code> 
        :
            props.children    
        }
    </Skeleton>
));

export default CustomSkeleton;
