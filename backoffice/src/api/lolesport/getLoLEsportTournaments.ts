import LoLEsportLeague from "../../models/LoLEsportLeague";

interface getLoLEsportTournamentsReturnType {
    data: {
        leagues: LoLEsportLeague[]
    }
}

const getLoLEsportTournaments = async (): Promise<getLoLEsportTournamentsReturnType>  => {
    const rawResponse = await fetch(`${process.env.REACT_APP_LOLESPORT_API_URL}getLeagues?hl=fr-FR`, {
        method: 'GET',
        headers: {
            'x-api-key': process.env.REACT_APP_LOLESPORT_API_URL ? process.env.REACT_APP_LOLESPORT_API_URL : '',
        },
    });
    if (!rawResponse.ok) {
        throw new Error(rawResponse.statusText);
    };
    return rawResponse.json();
}

export default getLoLEsportTournaments;
