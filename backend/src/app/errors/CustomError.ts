const errors = new Map<number, string>([
    [1, "This match is over"],
    [2, "You are not participating to this tournament yet"],
    [3, "This tournament does not exist"],
    [4, "This server does not exist"]
])

class CustomError extends Error {
    code: number

    constructor(code: number) {
        super(errors.get(code))
        this.code = code;
    }
}

export default CustomError;
