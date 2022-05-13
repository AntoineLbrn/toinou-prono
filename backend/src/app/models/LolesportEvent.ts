import LolesportMatch from "./LolesportMatch"

export enum LoLesportEventState {
    COMPLETED = 'completed',
    UNSTARTED = 'unstarted'
}

interface LolesportEvent {
    startTime: string
    state: LoLesportEventState
    type: string
    blockName: string
    league: {
        name: string
        slug: string
    }
    match: LolesportMatch
}

export default LolesportEvent;
