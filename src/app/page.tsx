import { Suspense } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Loader from "@/components/ui-kit/Loader";
import HomePage from "@/components/pages/HomePage/HomePage";
import { getProducts } from "@/api/getProducts";
import { getCategories } from "@/api/getCategories";
import { PRODUCTS_PAGE_SIZE } from "@/configs/constants";
import type { Locale } from "@/i18n/translations";
import styles from './page.module.scss'

export const metadata: Metadata = {
  title: 'Lalasia',
  description: 'Browse our product catalog',
}

type Props = {
  searchParams: Promise<{search?: string; page?: string; categories? : string}>
}

export default async function Home({searchParams}: Props) {
  const params = await searchParams
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale')?.value;
  const locale: Locale = localeCookie === 'ru' ? 'ru' : 'en';

  const page = parseInt(params.page || '1');
  const searchTitle = params.search || '';
  const categoryIds = params.categories ? params.categories.split(',').map(Number) : []

  const  [productsData, categories] = await Promise.all([
    getProducts({page, pageSize: PRODUCTS_PAGE_SIZE, searchTitle, categoryIds, locale}),
    getCategories(locale)
  ])
  return (
    
    <Suspense fallback={<Loader className={styles.mainLoader} size='l' />}>
        <HomePage
        initialProducts={productsData.data}
        initialTotal={productsData.meta.pagination.total}
        initialCategories={categories}
        />
    </Suspense>
  )
}
