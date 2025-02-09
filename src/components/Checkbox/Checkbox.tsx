import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  className?: string;
  text?: string;
	id?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ text, className, id }) => {
  return (
    <div className={`${styles.checkboxContainer} ${className}`}>
      <input type="checkbox" name="rememberme" id={id } />
      <label htmlFor={id}>{text}</label>
    </div>
  );
};

export default Checkbox;
