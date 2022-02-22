import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, VStack, Heading, Box } from "@chakra-ui/react"
import { CheckIcon, CloseIcon} from '@chakra-ui/icons'
import { FC } from "react"
import { botPermissions, checkPermission } from "../../utils/permissions"

interface ServerPermissionModalProps {
    permissions: string
    isOpen: boolean
    onClose: () => void
}

const ServerPermissionModal: FC<ServerPermissionModalProps> = ({permissions, isOpen, onClose}: ServerPermissionModalProps) => {
    const computeIcon = (permission: number) => {
      return checkPermission(permissions, permission) 
      ? <CheckIcon verticalAlign="middle" mb='3px' color="green.300" mr="10px" />
      : <CloseIcon verticalAlign="middle" mb='3px' color="red.300" mr="10px" />
    }

    return <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Permissions</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems="left">
            {botPermissions.map((permission) => (
              <Box key={permission.code} verticalAlign="middle">{computeIcon(permission.code)}<Heading display="inline" size="sm">{permission.label}</Heading></Box>
            ))}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
}

export default ServerPermissionModal