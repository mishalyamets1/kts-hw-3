import { STRAPI_BASE_URL } from "@/configs/api";
import { makeAutoObservable, runInAction } from "mobx";

export type User = {
  id: number;
  email: string;
  username: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  identifier: string;
  password: string;
};

export type AuthResponse = {
  jwt: string;
  user: User;
};

export type ErrorType = 'invalid_credentials' | 'user_exists' | 'validation_error' | 'unknown_error';

export class AuthStore {
    user: User | null = null;
    token: string | null = null;
    isLoading: boolean = false;
    errorType: ErrorType | null = null;

    constructor() {
        makeAutoObservable(this);
        this.checkAuth()
    }

    private clearAuth() {
        this.user = null;
        this.token = null;
        this.errorType = null
        this.removeFromLocalStorage()
    }

    private saveToLocalStorage() {
        if (typeof window === 'undefined') return;
        localStorage.setItem('auth_token', this.token || '')
        localStorage.setItem('auth_user', JSON.stringify(this.user || null))
    }

    private removeFromLocalStorage() {
        if (typeof window === 'undefined') return;

        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user')
    }

    checkAuth() {
        if (typeof window === 'undefined') return;

        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('auth_user');

        if (token && userData) {
            try {
                this.token = token;
                this.user = JSON.parse(userData);
            } catch (e) {
                this.clearAuth();
            }
        }
    }

    async register(payload: RegisterPayload): Promise<{success: boolean; error?: ErrorType}> {
        this.isLoading  = true;
        this.errorType = null;

        try {
            const res = await fetch(`${STRAPI_BASE_URL}/api/auth/local/register`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(payload)
            })
            if (!res.ok) {
                const errorText = await res.text()
                const errorType = this.parseErrorType(errorText)
                throw { errorType }
            }
            const data: AuthResponse = await res.json()
            runInAction(() => {
                this.token = data.jwt
                this.user = data.user
            })
            this.saveToLocalStorage()
            return {success: true}
        } catch (e) {
            const errorType = (e as any).errorType || 'unknown_error'
            runInAction(() => {
                this.errorType = errorType;
            })
            return {
                success: false, error: errorType
            }
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    async login(payload: LoginPayload): Promise<{success: boolean; error?: ErrorType}> {
        this.isLoading  = true;
        this.errorType = null;

        try {
            const res = await fetch(`${STRAPI_BASE_URL}/api/auth/local`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(payload)
            })
            if (!res.ok) {
                const errorText = await res.text()
                const errorType = this.parseErrorType(errorText)
                throw { errorType }
            }
            const data: AuthResponse = await res.json()
            runInAction(() => {
                this.token = data.jwt
                this.user = data.user
            })
            this.saveToLocalStorage()
            return {success: true}
        } catch (e) {
            const errorType = (e as any).errorType || 'unknown_error'
            runInAction(() => {
                this.errorType = errorType;
            })
            return {
                success: false, error: errorType
            }
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    private parseErrorType(errorText: string): ErrorType {
        try {
            const errorData = JSON.parse(errorText);
            const message = errorData?.error?.message || '';

            if (message.includes('Invalid identifier') || message.includes('Invalid password')) {
                return 'invalid_credentials';
            }
            if (message.includes('already exists')) {
                return 'user_exists';
            }
            if (errorData?.error?.name === 'ValidationError') {
                return 'validation_error';
            }
        } catch {
            // If parsing fails, return unknown_error
        }
        return 'unknown_error';
    }

    logout() {
        this.clearAuth()
    }

    get isAuthenticated(): boolean {
        return this.user !== null && this.token !== null
    }
}

export const authStore = new AuthStore();