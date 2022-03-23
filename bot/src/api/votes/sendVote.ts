import { Vote } from "../../models/Vote";
import put from "../put";

const sendVote = async (args: { betId: string, discordUserId: string }): Promise<Vote> => {
    return put(`vote`, args).then((data) => data as Vote);
}

export default sendVote;
