import User from "../../models/User";
import post from "../post";

const createUser = async (user: Omit<User,'id'>): Promise<User> => {
    return post(`user`, user).then((data) => data as User);
}

export default createUser;
