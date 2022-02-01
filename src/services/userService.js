import { httpService } from './httpService';

export const userService = {
    login,
    logout,
    signin,
    getLoggedInUser,
    getUserFromSession
};

const STORAGE_KEY = 'loggedInUser';

const BASE_URL = 'auth';
async function login(credentials) {
    try {
        const user = await httpService.post(`${BASE_URL}/login`, credentials);
        console.log('login -> user', user)
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        // localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        
        return user;
    } catch (err) {
        throw err;
    }
}
async function logout() {
    try {
        await httpService.post(`${BASE_URL}/logout`);
        sessionStorage.removeItem(STORAGE_KEY);
        // localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
        throw err;
    }
}

async function signin(credentials) {
    try {
        const user = await httpService.post(`${BASE_URL}/signin`, credentials);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        // localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        return user;
    } catch (err) {
        throw err;
    }
}

function getLoggedInUser() {

    return JSON.parse(sessionStorage.getItem(STORAGE_KEY));
}

async function getUserFromSession() {
    return await httpService.get(`${BASE_URL}`)

}
