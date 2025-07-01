import React from 'react';
import styles from './Loading.module.css';

interface LoadingProps {
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ className }) => (
  <div className={`${styles.spinner} ${className}`} />
);

export default Loading;
