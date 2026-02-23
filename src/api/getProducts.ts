import axios from "axios";
import qs from 'qs' 
import type { ProductsResponse } from "./productsTypes";

const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_BASE_URL;
const STRAPI_URL = `${STRAPI_BASE_URL}/api/products`;
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN

export const getProducts = async (page = 1, pageSize = 9): Promise<ProductsResponse> => {
    const query = qs.stringify(
        {
            populate: ['images', 'productCategory'],
            pagination: { page, pageSize },
        },
        { arrayFormat: 'brackets' }
    )
    const response = await axios.get<ProductsResponse>(`${STRAPI_URL}?${query}`, { headers: { Authorization: API_TOKEN } })
    return response.data
}