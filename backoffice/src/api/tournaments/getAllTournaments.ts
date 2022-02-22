import Tournament from "../../models/Tournament";
import get from "../get";

const getAllTournaments = async (): Promise<Tournament[]> => {
    return get('tournaments').then((data) => data as Tournament[]);
}

export default getAllTournaments;
