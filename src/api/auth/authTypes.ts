type AuthResponse = {
    jwt: string;
    user: {
        id: number;
        email: string;
        username: string;
    }
}

type RegisterParams = {
    username: string;
    email: string;
    password: string;
}

type LoginParams = {
    indentifier: string;
    password: string;
}