import ServerTournamentSubscribtion from "./ServerTournamentSubscription";

interface Server {
    id: string
    discordServerId: string
    subscribedTournaments: ServerTournamentSubscribtion[]
}

export default Server;
