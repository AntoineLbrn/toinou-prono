import Tournament from "../../models/Tournament";
import get from "../get";

const getTournament = async (id: string): Promise<Tournament> => {
    return get(`tournament/${id}`).then((data) => data as Tournament);
}

export default getTournament;
