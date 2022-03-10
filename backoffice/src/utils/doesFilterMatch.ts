export const doesFilterMatch = (str: string, filter: string): boolean => {
    return str.toLowerCase().includes(filter.toLowerCase());
} 