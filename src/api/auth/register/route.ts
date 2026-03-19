import { STRAPI_BASE_URL } from "@/configs/api";

export async function register(params: RegisterParams): Promise<AuthResponse> {
    const res = await fetch(`${STRAPI_BASE_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(params),
    })
    return res.json()
}