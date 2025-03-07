import React, { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  console.log(clsx(styles.container, className && className))
  return (
  <div className={clsx(styles.container, { [styles.header]: className } )}>{children}</div>);
  };
export default Container;
