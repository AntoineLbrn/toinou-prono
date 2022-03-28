import { UserTournamentParticipation } from "../../models/UserTournamentParticipation";
import post from "../post";

const sendParticipation = async (args: {tournamentId: string, discordUserId: string}): Promise<UserTournamentParticipation> => {
    return post(`participation/`, args).then((data) => data as UserTournamentParticipation);
}

export default sendParticipation;
