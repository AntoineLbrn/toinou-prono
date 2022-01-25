import User from "../../models/User";
import get from "../get";

const getUser = async (discordUserId: string): Promise<User> => {
    return get(`user/${discordUserId}`).then((data) => data as User);
}

export default getUser;
