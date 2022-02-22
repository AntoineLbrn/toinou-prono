interface DiscordServer {
    id: string,
    name: string,
    icon: string,
    owner: boolean,
    permissions: string,
    features: []
}

export default DiscordServer;
