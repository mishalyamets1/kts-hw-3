'use client'

import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Text from '@/components/ui-kit/Text';
import { cartStore } from '@/stores/global/CartStore';
import { authStore } from '@/stores/global/AuthStore/AuthStore';
import styles from './Header.module.scss';

const NAV_LINKS = [
  { href: '/', label: 'Products' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About us' },
];

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const Header = observer(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const resolvedTheme = getInitialTheme();
    setTheme(resolvedTheme);
    document.documentElement.dataset.theme = resolvedTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const logoMarkSrc = theme === 'dark' ? '/svg/logo-img-dark.svg' : '/svg/logo-img.svg';

  return (
    <>
      {/* Desktop Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src={logoMarkSrc}
              alt="Lalasia mark"
              className={styles.logoMark}
              height={42}
              width={42}
              priority
            />
            <Image
              src='/svg/Lalasia.svg'
              alt="Lalasia"
              className={styles.logoText}
              height={24}
              width={108}
              priority
            />
          </Link>
        </div>
        <nav className={styles.nav}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(styles.link, { [styles.active]: isActive(href) })}
            >
              <Text view="p-18" tag="p" color={isActive(href) ? 'accent' : 'primary'}>
                {label}
              </Text>
            </Link>
          ))}
        </nav>
        <div className={styles.icons}>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <div className={clsx(styles.cart, { [styles.active]: pathname === '/cart' })}>
            <Image
              src="/svg/cart.svg"
              alt="cart"
              className={styles.iconImage}
              width={30}
              height={30}
              priority
              onClick={() =>
                router.push(authStore.isAuthenticated ? '/cart' : '/auth?next=/cart')
              }
              style={{ cursor: 'pointer' }}
            />
            <Text className={styles.cartCount} color='primary'>{cartStore.itemsCount}</Text>
          </div>
          <div className={clsx(styles.account, { [styles.active]: pathname === '/profile' || pathname === '/auth' })}>
            <Image
              src="/svg/user.svg"
              alt="user"
              className={styles.iconImage}
              width={30}
              height={30}
              priority
              onClick={() => router.push(authStore.isAuthenticated ? '/profile' : '/auth')}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <div className={styles.burger}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src={logoMarkSrc}
              alt="Lalasia mark"
              className={styles.logoMark}
              height={32}
              width={32}
              priority
            />
            <Image
              src='/svg/Lalasia.svg'
              alt="Lalasia"
              className={styles.logoText}
              height={18}
              width={82}
              priority
            /> 
          </Link>
        </div>

        <div className={styles.icons}>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <button
            className={clsx(styles.burgerMenu, { [styles.active]: isMenuOpen })}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className={clsx(styles.cart, { [styles.active]: pathname === '/cart' })}>
            <Image
              src="/svg/cart.svg"
              alt="cart"
              className={styles.iconImage}
              width={30}
              height={30}
              priority
              onClick={() =>
                router.push(authStore.isAuthenticated ? '/cart' : '/auth?next=/cart')
              }
              style={{ cursor: 'pointer' }}
            />
            <Text className={styles.cartCount} color='primary'>{cartStore.itemsCount}</Text>
          </div>
          <div className={clsx(styles.account, { [styles.active]: pathname === '/profile' || pathname === '/auth' })}>
            <Image
              src="/svg/user.svg"
              alt="user"
              className={styles.iconImage}
              width={30}
              height={30}
              priority
              onClick={() => router.push(authStore.isAuthenticated ? '/profile' : '/auth')}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className={styles.navMobile}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(styles.link, { [styles.active]: isActive(href) })}
              onClick={closeMenu}
            >
              <Text view="p-18" tag="p" color={isActive(href) ? 'accent' : 'primary'}>
                {label}
              </Text>
            </Link>
          ))}
        </nav>
      )}
    </>
  );
});

export default Header;
