import { forwardRef, FlexProps, Flex } from '@chakra-ui/react'

const HeaderFlexOverlay = forwardRef<FlexProps, 'div'>((props, ref) => (
    <Flex 
        bgColor="#1E2F3D" 
        boxShadow="0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 2rem #20FCFF, 0 0 0rem #20FCFF, 0 0 2.8rem #20FCFF,inset 0 0 0rem #20FCFF;" 
        h="10vh"  
        ref={ref} 
        {...props} 
    />
));

export default HeaderFlexOverlay;
