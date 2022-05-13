interface LoLEsportLeague {
    id: string
    slug: string
    name: string
    region: string
    image: string
    priority: number
    displayPriority: {
        position: number
        status: string
    }
}

export default LoLEsportLeague;
