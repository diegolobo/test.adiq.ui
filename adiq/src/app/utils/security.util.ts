import { User } from "../models/user.model";

export class Security {
    public static set(user: User, token: string) {
        const data = JSON.stringify(user);

        localStorage.setItem('user', btoa(data));
        localStorage.setItem('token', token);
    }

    public static setUser(user: User) {
        const data = JSON.stringify(user);
        localStorage.setItem('user', btoa(data));
    }

    public static getUser(): User {
        const data = localStorage.getItem('user');
        if (data) {
            return JSON.parse(atob(data));
        } else {
            return null;
        }
    }

    public static clear() {
        localStorage.removeItem('user');
    }
}