import { NextFunction, Request, Response } from "express";
import jwt from'jsonwebtoken';

const checkJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'].split(' ')[1];
    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token, process.env.JWT_SECRET);
        res.locals.jwtPayload = jwtPayload;
        next();
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send();
    }
}

export default checkJWT;