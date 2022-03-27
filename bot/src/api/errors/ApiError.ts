const statusCodeMappedToString = (code: string): string => {
    switch (code) {
        case '1':
            return "Ce match est terminé..."
        case '2':
            return "Tu ne participes pas à ce tournoi..."
        case '3':
            return "Ce tournoi n'existe pas..."
        case '5':
            return "Tu n'es pas inscrit·e à ce tournoi..."
        case '6':
            return "Tu n'es inscrit·e à aucun tournoi..."
        default:
            return `Erreur inconnue : ${code}`
    }
}


class ApiError extends Error {
    constructor(statusText: string) {
        console.log(statusText)
        super(statusCodeMappedToString(statusText.split(' ')[0]));
    }
}

export default ApiError