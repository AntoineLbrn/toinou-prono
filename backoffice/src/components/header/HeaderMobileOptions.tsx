import { Box, VStack } from "@chakra-ui/react"
import { FC } from "react"
import history from '../../utils/history'
import HeaderUserSection from "./HeaderUserSection"

interface HeaderMobileOptionsProps {
    headerTabs: any[]
    isActive: boolean
}

const HeaderMobileOptions: FC<HeaderMobileOptionsProps> = ({headerTabs, isActive}: HeaderMobileOptionsProps) => {
    return isActive ? <Box w="100%" bgColor="#1E2F3D" position="fixed" zIndex="10" h="90vh">
        <VStack mt="30px" spacing="20px">
        {headerTabs.map((headerTab: any) => (
            <Box key={headerTab.url} sx={{ fontVariant: 'small-caps' }} fontSize="3xl" onClick={() => history.push(headerTab.url)}>{headerTab.label} </Box>
        ))}
        <HeaderUserSection />
        </VStack>
    </Box> : null
}

export default HeaderMobileOptions