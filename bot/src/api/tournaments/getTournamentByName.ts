import Tournament from "../../models/Tournament";
import get from "../get";

const getTournamentByName = async (name: string): Promise<Tournament> => {
    return get(`tournament/label=${name}`).then((data) => data as Tournament);
}

export default getTournamentByName;
