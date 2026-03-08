import { Suspense } from "react";
import type { Metadata } from "next";
import Loader from "@/components/ui-kit/Loader";
import HomePage from "@/components/pages/HomePage/HomePage";
import { getProducts } from "@/api/getProducts";
import { getCategories } from "@/api/getCategories";

export const metadata: Metadata = {
  title: 'Home',
  description: 'Browse our product catalog',
}

type Props = {
  searchParams: Promise<{search?: string; page?: string; categories? : string}>
}

export default async function Home({searchParams}: Props) {
  const params = await searchParams

  const page = parseInt(params.page || '1');
  const searchTitle = params.search || '';
  const categoryIds = params.categories ? params.categories.split(',').map(Number) : []

  const  [productsData, categories] = await Promise.all([
    getProducts({page, pageSize: 9, searchTitle, categoryIds}),
    getCategories()
  ])
  return (
    <Suspense fallback={<Loader size='l' />}>
        <HomePage
        initialProducts={productsData.data}
        initialTotal={productsData.meta.pagination.total}
        initialCategories={categories}
        />
    </Suspense>
  )
}
