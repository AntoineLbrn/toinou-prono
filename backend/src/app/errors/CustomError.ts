const errors = new Map<number, string>([
    [1, "This match is over"],
    [2, "You are not participating to this tournament yet"],
    [3, "This tournament does not exist"],
    [4, "This server does not exist"],
    [5, "This participation does not exist"],
    [6, "This user does not exist"],
    [7, "This participation already exists"],
    [7, "This user already exists"],
    [9, "This tournament has no lolesport league linked"],
])

class CustomError extends Error {
    code: number

    constructor(code: number) {
        super(errors.get(code))
        this.code = code;
    }
}

export default CustomError;
