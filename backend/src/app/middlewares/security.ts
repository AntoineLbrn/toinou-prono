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

export const checkJWTOrApiKey = async (req: Request, res: Response, next: NextFunction) => {
    const JWTOrApiKey = req.headers['authorization'].split(' ')[1];
    console.log(` JWTOrApiKey : ${JWTOrApiKey}`);
    try {
        const jwtPayload = <any>jwt.verify(JWTOrApiKey, process.env.JWT_SECRET);
        res.locals.jwtPayload = jwtPayload;
        next();
    } catch (error) {
        if (JWTOrApiKey === process.env.API_KEY) {
            next();
        } else {
            res.status(401).send();
        }
    }
}

export const checkApiKey = async (req: Request, res: Response, next: NextFunction) => {
    console.log('authorization : ' + req.headers['authorization'])
    const apiKey = req.headers['authorization'].split(' ')[1];
    console.log('apikey : ' + apiKey)
    if (apiKey === process.env.API_KEY) {
        next();
    } else {
        res.status(401).send();
    }
}

export default checkJWT;