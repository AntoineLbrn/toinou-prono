export enum LogType {
    TRIGGERED = 'TRIGGERED',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED'
}

const log = (from: string, type:LogType, message?: any) => {
    const today = new Date();
    console.log(`${today.toISOString()} : ${from} -> ${type}`);
    console.log(message ? JSON.stringify(message)+'\n' : '');
} 

export default log;