const setDateToMidnight = (date: Date): Date => {
    date.setHours(1,0,0,0);
    return date;
}

export default setDateToMidnight;
