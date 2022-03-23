const statusCodeMappedToString = (code: string): string => {
    switch (code) {
        case '1': 
            return "Ce match est terminé..."
        case '2': 
            return "Tu ne participes pas à ce tournoi..."
        default :
            return `Erreur inconnue : ${code}` 
    }
}


class ApiError extends Error {
    constructor (statusText: string) {
        super(statusCodeMappedToString(statusText.split(' ')[0]));
    }
}

export default ApiError