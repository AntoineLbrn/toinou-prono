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
            return "Tu ne fais pas partie de mon registre. Exécute \`\`/start\`\`"
        case '7':
            return "Tu es déjà inscrit·e à ce tournoi..."
        case '8':
            return "Tu fais déjà partie de mon registre !"
        default:
            return `Erreur inconnue : ${code}`
    }
}


class ApiError extends Error {
    constructor(statusText: string) {
        super(statusCodeMappedToString(statusText.split(' ')[0]));
    }
}

export default ApiError