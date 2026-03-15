import type { Metadata } from "next";
import localFont from 'next/font/local';
import Header from "@/components/Header";
import Toast from "@/components/Toast";
import StoreProvider from "@/components/providers/StoreProvider";
import ThemeScript from "./ThemeScript";
import "./globals.scss";

const roboto = localFont({
  src: [
    {
      path: '../styles/Roboto/Roboto-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../styles/Roboto/Roboto-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../styles/Roboto/Roboto-Bold.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: {
    default: 'E-commerce',
    template: '%s | E-commerce App',
  },
  description: "E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable} data-theme="light" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body >
        <StoreProvider>
          <Header />
          {children}
          <Toast />
        </StoreProvider>
      </body>
    </html>
  );
}
