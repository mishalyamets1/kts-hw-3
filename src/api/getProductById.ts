import axios from "axios";
import qs from 'qs' 
import type { Product } from "./productsTypes";
const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api/products`;
const API_TOKEN = 'f53a84efed5478ffc79d455646b865298d6531cf8428a5e3157fa5572c6d3c51739cdaf3a28a4fdf8b83231163075ef6a8435a774867d035af53717fecd37bca814c6b7938f02d2893643e2c1b6a2f79b3ca715222895e8ee9374c0403d44081e135cda1f811fe7cfec6454746a5657ba070ec8456462f8ca0e881232335d1ef'
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