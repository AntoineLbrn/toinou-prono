import User from "../../models/User";
import get from "../get";

const getUserByDiscordId = async (discordUserId: string): Promise<User> => {
    return get(`user/?discordUserId=${discordUserId}`).then((data) => data as User);
}

export default getUserByDiscordId;
