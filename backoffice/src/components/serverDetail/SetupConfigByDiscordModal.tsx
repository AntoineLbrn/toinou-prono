import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, VStack, Heading, Box, Kbd, Text } from "@chakra-ui/react"
import { CheckIcon, CloseIcon} from '@chakra-ui/icons'
import { FC } from "react"
import { botPermissions, checkPermission } from "../../utils/permissions"

interface SetupConfigByDiscordModalProps {
    tournamentName: string
    isOpen: boolean
    onClose: () => void
}

const SetupConfigByDiscordModal: FC<SetupConfigByDiscordModalProps> = ({isOpen, onClose, tournamentName}: SetupConfigByDiscordModalProps) => {

    return <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Mets à jour ton serveur</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Text>Pour valider cette configuration, tape</Text>
            <Text my="10px" ><Kbd fontSize="lg">/config {tournamentName}</Kbd></Text>
            <Text>dans un channel de ton serveur !</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
}

export default SetupConfigByDiscordModal