import Server from "../../models/Server";
import get from "../get";

const getAllServers = async (): Promise<Server[]> => {
    return get(`servers`).then((data) => data as Server[]);
}

export default getAllServers;
