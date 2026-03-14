'use client';

import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import styles from './ScrollToTopButton.module.scss';
import Image from 'next/image';

export default function ScrollToTopButton() {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Показываем кнопку когда скроллим ниже 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Показываем только на мобилке
  if (!isMobile || !isVisible) return null;

  return (
    <button
      className={styles.button}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <Image
        src="/svg/arrow-left.svg"
        alt="up"
        width={24}
        height={24}
        style={{ transform: 'rotate(90deg)' }}
      />
    </button>
  );
}
