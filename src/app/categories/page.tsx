import Categories from "@/components/pages/Categories"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Learn more about our store',
};

const CategoriesPage = () => {
  return (
    <Categories/>
  )
}

export default CategoriesPage