import React, { FC } from 'react';
import { Box, Icon, VStack } from '@chakra-ui/react';
import AdminMenuHeading from './AdminMenuHeading';
import { MdOutlinePeopleAlt, MdOutlineSportsEsports, MdHouse } from 'react-icons/md'
import AdminMenuSubHeading from './AdminMenuSubHeading';


const AdminMenu: FC = () => (
    <>
        <VStack w="22vw" h="100%" bgColor="#1E2F3D" position="fixed"
            boxShadow="0 0 .2rem #fff, 0 .2rem .2rem #fff, 0 2rem 2rem #20FCFF, 0 0 0rem #20FCFF, 0 2.8rem 2.8rem #20FCFF" 
        >
            <AdminMenuHeading mt="40px" mb="20px"><Icon mr="5px" as={MdOutlinePeopleAlt} /> UTILISATEURS</AdminMenuHeading>
            <VStack w="100%" spacing="15px">
                <AdminMenuSubHeading path="users">Liste utilisateurs</AdminMenuSubHeading>
                <AdminMenuSubHeading path="users/add">Ajouter un utilisateur</AdminMenuSubHeading>
                <AdminMenuSubHeading path="users/search">Rechercher un utilisateur</AdminMenuSubHeading>
            </VStack>
            <AdminMenuHeading mt="40px" mb="20px"><Icon mr="5px" as={MdOutlineSportsEsports} /> TOURNOIS DE PRONOS</AdminMenuHeading>
            <VStack w="100%" spacing="15px">
                <AdminMenuSubHeading path="tournaments">Liste des tounois</AdminMenuSubHeading>
                <AdminMenuSubHeading path="tournaments/create">Créer un tournoi</AdminMenuSubHeading>
            </VStack>
            <AdminMenuHeading mt="40px" mb="20px"><Icon mr="5px" as={MdHouse} /> SERVEURS </AdminMenuHeading>
            <VStack w="100%" spacing="15px">
                <AdminMenuSubHeading path="servers">Liste serveurs</AdminMenuSubHeading>
            </VStack>
        </VStack>
    </>
)

export default AdminMenu;
