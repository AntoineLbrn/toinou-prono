import fetch from "node-fetch";
import LolesportEvent, { LoLesportEventState } from "../models/LolesportEvent";

class LolesportService {

    async getScheduleByLeagueId(leagueId: string): Promise<any> {
        const rawResponse = await fetch(`${process.env.LOLESPORT_API_URL}getSchedule?hl=fr-FR&leagueId=${leagueId}`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.LOLESPORT_API_KEY
            },
        });
        if (!rawResponse.ok) throw await rawResponse.json();
        return rawResponse.json();
    }

    async getFuturEvents(leagueId: string): Promise<LolesportEvent[]> {
        const schedule = await this.getScheduleByLeagueId(leagueId);
        const events = schedule.data.schedule.events as LolesportEvent[];
        return events.filter((event) => event.state === LoLesportEventState.UNSTARTED);
    }

    async getPastEvents(leagueId: string): Promise<LolesportEvent[]> {
        const schedule = await this.getScheduleByLeagueId(leagueId);
        const events = schedule.data.schedule.events as LolesportEvent[];
        return events.filter((event) => event.state === LoLesportEventState.COMPLETED);
    }
}

export default new LolesportService();