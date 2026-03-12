import SingleCard from "@/components/pages/SingleCard";
import { notFound } from "next/navigation";
import { getProductById } from "@/api/getProductById";
import { getProductsByCategory } from "@/api/getProductsByCategory";
import { Metadata } from "next";

type Props = {
    params: Promise<{productId: string}>
}

export async function generateMetadata({params}: Props): Promise<Metadata>{
  const {productId} = await params;
  const product = await getProductById(productId);
  if (!product) {
    notFound();
  }
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images?.[0]?.url ? [product.images[0].url] : [],
    },
  };

}

export default async function ProductPage({params}: Props) {
    const {productId} = await params;
    const product = await getProductById(productId)

    if (!product) {
      notFound()
    }
    const relatedData = await getProductsByCategory(product.productCategory?.id);
  return (
    <SingleCard product={product} relatedProducts={relatedData.data} />
  )
}
