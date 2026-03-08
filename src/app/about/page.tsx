import About from "@/components/pages/About"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our store',
};

const AboutPage = () => {
  return (
    <About />
  )
}

export default AboutPage