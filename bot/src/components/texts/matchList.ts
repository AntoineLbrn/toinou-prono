import { MessagePayload } from "discord.js";
import { Match } from "../../models/Match";


const matchList = (matchList: Match[]) => {
    return !!matchList.length 
    ? matchList.map((match) => match.label).join(' - ')
    : "Pas de match pour aujourd'hui"
}

export default matchList;