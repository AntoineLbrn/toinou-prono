import Server from "./Server";
import Tournament from "./Tournament";

interface ServerTournamentSubscribtion {
  id: string
  server: Server
  tournament: Tournament
  shouldAutoPostBets: boolean
  autoPostBetsHour: string
  autoPostBetsMinutes: string
  bettorRoleId: string
  bettorRoleLabel: string
  bettorChannelId: string
  bettorChannelLabel: string
}

export default ServerTournamentSubscribtion;
