import { Match } from "../models/Match";

const groupMatchesByDate = (matches: Match[]): any => {
  const groups = matches.reduce((groups: any, match: Match) => {
    const date = new Date(match.date).toLocaleDateString('fr', {weekday: 'long', day: 'numeric', month: 'long' });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(match)
    return groups;
  }, {});

  return groups;
}

export default groupMatchesByDate;
  