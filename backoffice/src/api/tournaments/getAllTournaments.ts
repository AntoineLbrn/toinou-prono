import Tournament from "../../models/Tournament";
import get from "../get";

const getAllTournaments = async (): Promise<Tournament[]> => {
    return get('tournaments?relations=serversSubscriptions,serversSubscriptions.server').then((data) => data as Tournament[]);
}

export default getAllTournaments;
