
export const botPermissions = [
    {label: 'Envoyer des messages', code: 0x800},
    {label: 'Gérer les messages', code: 0x2000},
    {label: 'Lire les messages', code: 0x400},
    {label: 'Gérer les rôles', code: 0x10000000},
    {label: 'Gérer les salons', code: 0x10},

]

export const checkPermission = (permissions: string, wantedPermission: number): boolean => {
    return (BigInt(permissions) & BigInt(wantedPermission)) === BigInt(wantedPermission);
}

export const canInviteBot = (permissions: string) => {
    return checkPermission(permissions, 0x20);
}

export const canModerateServerTournaments = (permissions: string) => {
    return checkPermission(permissions, 0x10) && checkPermission(permissions, 0x10000000)
}