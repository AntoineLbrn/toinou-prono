import { FC } from "react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, VStack, Heading, Box, Kbd, Text } from "@chakra-ui/react"

interface ConfirmDeletionModalProps {
    label: string
    isOpen: boolean
    onConfirm: () => void
    onClose: () => void
}

const ConfirmDeletionModal: FC<ConfirmDeletionModalProps> = ({isOpen, onClose, onConfirm, label}: ConfirmDeletionModalProps) => {
    return <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Supprimer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Text>Supprimer {label} ?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='red' variant='solid' mr='10px' onClick={onConfirm}>Confirmer</Button>
          <Button variant='solid' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
}

export default ConfirmDeletionModal;
