import { Match } from "./Match";
import ServerTournamentSubscribtion from "./ServerTournamentSubscription";
import { UserTournamentParticipation } from "./UserTournamentParticipation";

interface Tournament {
  id: string
  label: string
  description: string
  matches: Match[]
  participations: UserTournamentParticipation[]
  serversSubscriptions: ServerTournamentSubscribtion[]
  externalTournamentId: string
}

export default Tournament;