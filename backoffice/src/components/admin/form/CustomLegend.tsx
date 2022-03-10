import React, { FC } from 'react';
import { Box, BoxProps, chakra, forwardRef, HStack, propNames } from '@chakra-ui/react';

const legend: FC = (props) => (
    <legend {...props}> {props.children} </legend>
);

const ChakraLegend = chakra(legend)

const ChakraCustomLegend = forwardRef<BoxProps, 'legend'>((props, ref) => (
    <ChakraLegend ref={ref} {...props}>
        {props.children}
    </ChakraLegend>
));

export default ChakraCustomLegend;
