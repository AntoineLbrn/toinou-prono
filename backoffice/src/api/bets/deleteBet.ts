import { Bet } from "../../models/Bet";
import deleteRequest from "../delete";

const deleteBet = async (id: string): Promise<Bet> => {
    return deleteRequest(`bet/${id}`);
}

export default deleteBet;
