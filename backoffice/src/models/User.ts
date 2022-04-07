import { UserTournamentParticipation } from "./UserTournamentParticipation";

interface User {
    id: string;
    discordUserId: string;
    isSuperAdmin: boolean;
    tagUsedToBe: string;
    participations: UserTournamentParticipation[];
}

export default User;
