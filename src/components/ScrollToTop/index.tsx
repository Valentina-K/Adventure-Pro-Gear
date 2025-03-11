'use client';

import Image from 'next/image';
import scrollUp from '@/../public/icons/scrollUp.svg';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 920) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ isVisible ]);

	const toTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

  const classNames = clsx(styles.about_navigation_scrollUp, {
    [styles.visible]: isVisible,
  });
  return (
    <button className={classNames} onClick={() => toTop()}>
      <Image src={scrollUp} alt="scroll Up" width={46} height={46} />
    </button>
  );
}

export default ScrollToTop;
