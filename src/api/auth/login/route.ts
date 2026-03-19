import { STRAPI_BASE_URL} from "@/configs/api";

export async function login(params: LoginParams): Promise<AuthResponse> {
    const res = await fetch(`${STRAPI_BASE_URL}/auth/local`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(params)
    })
    return res.json()
}