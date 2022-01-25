import Role from "./Roles";

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.reload();
}

export const removeToken = () => {
    localStorage.removeItem('role');
    return localStorage.removeItem('token');
    
}

export const getToken = () => {
    return localStorage.getItem('token');
}

export const getRole = () => {
    return localStorage.getItem('role');
}

export const setToken = (token: string) => {
    localStorage.setItem('token', token);
}

export const setRole = (role: Role) => {
    localStorage.setItem('role', role);
}