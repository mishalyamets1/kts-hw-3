export type Product = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  images: ProductImage[];
  productCategory: ProductCategory | null;
};
export type ProductImage = {
  id: number;
  documentId: string;
  url: string;
};
export type ProductCategory = {
  id: number;
  documentId: string;
  title: string;
};
export type ProductsResponse = {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type CartItem = {
  productId: number;
  quantity: number;
  id: number;
  product: Product;
};
