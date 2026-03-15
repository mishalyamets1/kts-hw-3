import Categories from "@/components/pages/Categories"
import { getCategories } from "@/api/getCategories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Learn more about our store',
};

const CategoriesPage = async () => {
  const categories = await getCategories();
  return (
    <Categories categories={categories} />
  )
}

export default CategoriesPage