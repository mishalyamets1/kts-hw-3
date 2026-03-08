'use client'

import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Text from '@/components/ui-kit/Text';
import { cartStore } from '@/stores/global/CartStore';
import styles from './Header.module.scss';

const navLinks = [
  { href: '/', label: 'Products' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About us' },
];

const Header = observer(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* Desktop Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/svg/logo.svg" alt="logo" height={42} width={130}/>
          </Link>
        </div>
        <nav className={styles.nav}>
          {navLinks.map(({ href, label }) => (
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
          <div className={styles.cart}>
            <Image
              src="/svg/cart.svg"
              alt="cart"
              width={30}
              height={30}
              onClick={() => router.push('/cart')}
              style={{ cursor: 'pointer' }}
            />
            {cartStore.itemsCount}
          </div>
          <div className={styles.account}>
            <Image src="/svg/user.svg" alt="user" width={30} height={30} />
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <div className={styles.burger}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/svg/logo.svg" alt="logo" height={42} width={130}/>
          </Link>
        </div>

        <div className={styles.icons}>
          <button
            className={clsx(styles.burgerMenu, { [styles.active]: isMenuOpen })}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className={styles.cart}>
            <Image
              src="/svg/cart.svg"
              alt="cart"
              width={30}
              height={30}
              onClick={() => router.push('/cart')}
              style={{ cursor: 'pointer' }}
            />
            {cartStore.itemsCount}
          </div>
          <div className={styles.account}>
            <Image src="/svg/user.svg" alt="user" width={30} height={30} />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className={styles.navMobile}>
          {navLinks.map(({ href, label }) => (
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
