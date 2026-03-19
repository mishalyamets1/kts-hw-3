import type { Metadata } from "next";
import { cookies } from 'next/headers';
import localFont from 'next/font/local';
import Header from "@/components/Header";
import Toast from "@/components/Toast";
import I18nProvider from "@/components/providers/I18nProvider";
import StoreProvider from "@/components/providers/StoreProvider";
import type { Locale } from '@/i18n/translations';
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
  icons: {
    icon: '/svg/logo-img.svg',
    apple: '/svg/logo-img.svg',
    other: [
      { url: '/svg/logo-img.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale')?.value;
  const initialLocale: Locale = localeCookie === 'ru' ? 'ru' : 'en';

  return (
    <html lang={initialLocale} className={roboto.variable} data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/svg/logo-img.svg" type="image/svg+xml" />
        <ThemeScript />
      </head>
      <body >
        <StoreProvider>
          <I18nProvider initialLocale={initialLocale}>
            <Header />
            <main className="appContent">{children}</main>
            <Toast />
          </I18nProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
