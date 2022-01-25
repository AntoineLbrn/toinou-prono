import DiscordUser from "../../models/DiscordUser";
import get from "../get";

const getCurrentUser = async (): Promise<DiscordUser> => {
    return get(`user/@me`).then((data) => data as DiscordUser);
}

export default getCurrentUser;
