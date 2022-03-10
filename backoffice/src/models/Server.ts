import ServerTournamentSubscribtion from "./ServerTournamentSubscription";

interface Server {
    id: string
    discordServerId: string
    subscribedTournaments: ServerTournamentSubscribtion[]
    discordServerNameUsedToBe: string;
}

export default Server;
