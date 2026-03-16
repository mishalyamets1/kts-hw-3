import { cookies } from "next/headers";
import Categories from "@/components/pages/Categories"
import { getCategories } from "@/api/getCategories";
import { getProductsByCategory } from "@/api/getProductsByCategory";
import { Metadata } from "next";
import type { Locale } from "@/i18n/translations";

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Learn more about our store',
};

const CategoriesPage = async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale')?.value;
  const locale: Locale = localeCookie === 'ru' ? 'ru' : 'en';

  const categories = await getCategories(locale);
  
  // Fetch the first product for each category
  const categoriesWithProducts = await Promise.all(
    categories.map(async (category) => {
      const products = await getProductsByCategory(category.id, locale);
      return {
        ...category,
        firstProductImage: products.data[0]?.images[0]?.url || null,
      };
    })
  );

  return (
    <Categories categories={categoriesWithProducts} />
  )
}

export default CategoriesPage