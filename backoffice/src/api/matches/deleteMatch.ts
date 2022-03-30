import { Match } from "../../models/Match";
import deleteRequest from "../delete";
import post from "../post";

const createMatch = async (id: string): Promise<Match> => {
    return deleteRequest(`match/${id}`);
}

export default createMatch;
