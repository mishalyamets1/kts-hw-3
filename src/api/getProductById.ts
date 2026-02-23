import axios from "axios";
import qs from 'qs' 
import type { Product } from "./productsTypes";
const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_BASE_URL;
const STRAPI_URL = `${STRAPI_BASE_URL}/api/products`;
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN
type ProductByIdResponse = {
    data: Product
}
export const getProductById = async (documentId: string) : Promise<Product> => {
    const query = qs.stringify(
        {populate : ["images", "productCategory"]},
    )
    const response = await axios.get<ProductByIdResponse>(`${STRAPI_URL}/${documentId}?${query}`, {headers:{authorization: API_TOKEN} })
    return response.data.data
}