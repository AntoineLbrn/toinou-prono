import Role from "./Roles"
import { getRole } from "./session"

export const isAuthorized = (roles: Role[]): boolean => {
    return roles.includes(getRole());
}