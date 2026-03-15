import SingleCard from "@/components/pages/SingleCard";
import { notFound } from "next/navigation";
import { getProductById } from "@/api/getProductById";
import { getProductsByCategory } from "@/api/getProductsByCategory";
import { Metadata } from "next";
import { Suspense } from "react";

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
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  const relatedPromise = getProductsByCategory(product.productCategory?.id);

  return (
    <Suspense>
      <SingleCard product={product} relatedPromise={relatedPromise} />
    </Suspense>
  );
}
