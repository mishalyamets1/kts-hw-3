import { cookies } from "next/headers";
import SingleCard from "@/components/pages/SingleCard";
import { notFound } from "next/navigation";
import { getProductById } from "@/api/getProductById";
import { getProductsByCategory } from "@/api/getProductsByCategory";
import { Metadata } from "next";
import { Suspense } from "react";
import type { Locale } from "@/i18n/translations";

type Props = {
    params: Promise<{productId: string}>
}

export async function generateMetadata({params}: Props): Promise<Metadata>{
  const {productId} = await params;
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale')?.value;
  const locale: Locale = localeCookie === 'ru' ? 'ru' : 'en';
  
  const product = await getProductById(productId, locale);
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
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale')?.value;
  const locale: Locale = localeCookie === 'ru' ? 'ru' : 'en';
  
  const product = await getProductById(productId, locale);

  if (!product) {
    notFound();
  }

  const relatedPromise = getProductsByCategory(product.productCategory?.id, locale);

  return (
    <Suspense>
      <SingleCard product={product} relatedPromise={relatedPromise} />
    </Suspense>
  );
}
