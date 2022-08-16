import Tournament from "../../models/Tournament";
import get from "../get";

const getTournament = async (id: string, relations: string[] = []): Promise<Tournament> => {
    return get(`tournament/${id}?relations=${relations.join(',')}`).then((data) => data as Tournament);
}

export default getTournament;
