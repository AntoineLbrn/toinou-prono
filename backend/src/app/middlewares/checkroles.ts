import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import Roles from "../utils/roles";

const userHasAtLeastOneRole = (roles: Array<Roles>,user: User) => {
    return roles.find(
        (role) => role === Roles.BASIC_USER || role === Roles.ADMIN && user.isSuperAdmin
    )
}

const checkRoles = (roles: Array<Roles>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const discordUserId = res.locals.jwtPayload.discordUserId;

    //Get user role from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
        user = await userRepository.findOneOrFail({discordUserId});
    } catch (id) {
        res.status(401).send('invalid token');
        return;
    }
    if (userHasAtLeastOneRole(roles, user)) next();
    else res.status(401).send("You don't have admin permissions");
  };
};

export default checkRoles;