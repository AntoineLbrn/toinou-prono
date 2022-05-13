import React, { FC } from 'react';
import { Box, BoxProps, chakra, forwardRef, HStack, propNames } from '@chakra-ui/react';

const fieldset: FC = (props) => (
    <fieldset {...props}> {props.children} </fieldset>
);

const ChakraFieldset = chakra(fieldset)

const ChakraCustomFieldset = forwardRef<BoxProps, 'fieldset'>((props, ref) => (
    <ChakraFieldset w="100%" ref={ref} {...props}>
        {props.children}
    </ChakraFieldset>


));

export default ChakraCustomFieldset;
