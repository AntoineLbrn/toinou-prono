import { forwardRef, BoxProps, Heading, Center, Box } from '@chakra-ui/react'
import { useState } from 'react';

const HeaderSection = forwardRef<BoxProps, 'div'>((props, ref) => {
    const [hovered, setHovered] = useState(false);

    return <Center 
        height="100%"
        color="#ECE6D6" 
        border="1px solid transparent"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        cursor={hovered ? "pointer" : ''}
        transition="0.4s"
    >
        <Box 
            paddingY="10px"         
            borderBottom="2px solid"
            borderColor={hovered ? '#20FCFF' : 'transparent'}
        >
            <Heading 
                padding="10px"
                borderRadius="5px"

                bgColor={hovered ? "#283c4d" : ""}
                fontWeight="600" 
                fontSize="2xl" 
                sx={{ fontVariant: 'small-caps' }}
                ref={ref} 
                {...props} 
            />
        </Box>
    </Center>
});

export default HeaderSection;
