import { Box, VStack } from "@chakra-ui/react"
import { FC } from "react"
import history from '../../utils/history'

interface HeaderMobileOptionsProps {
    headerTabs: any[]
}

const HeaderMobileOptions: FC<HeaderMobileOptionsProps> = ({headerTabs}: HeaderMobileOptionsProps) => {
    return <Box w="100%" bgColor="#1E2F3D" position="fixed" zIndex="10" h="90vh">
        <VStack mt="30px" spacing="20px">
        {headerTabs.map((headerTab: any) => (
            <Box sx={{ fontVariant: 'small-caps' }} fontSize="3xl" onClick={() => history.push(headerTab.url)}>{headerTab.label} </Box>
        ))}
        </VStack>
    </Box>
}

export default HeaderMobileOptions