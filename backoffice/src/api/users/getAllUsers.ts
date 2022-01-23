import User from "../../models/User";
import get from "../get";

const getAllUsers = async (): Promise<User[]> => {
    return get('users').then((data) => data as User[]);
}

export default getAllUsers;
