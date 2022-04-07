import User from "../../models/User";
import get from "../get";

const getUser = async (id: string, relations: string[] = []): Promise<User> => {
    return get(`user/${id}?relations=${relations.join(',')}`).then((data) => data as User);
}

export default getUser;
