import Role from "./Roles";

const headerTabs = [
    {
        url: '/my-bets',
        label: 'mes pronos',
        roles: [Role.BASIC_USER, Role.ADMIN]
    },
    {
        url: '/tournaments',
        label: 'tournois',
        roles: [Role.BASIC_USER, Role.ADMIN]
    },
    {
        url: '/servers',
        label: 'mes serveurs',
        roles: [Role.BASIC_USER, Role.ADMIN]
    },

    {
        url: '/admin',
        label: '🔒 admin',
        roles: [Role.ADMIN]
    }
]

export default headerTabs;