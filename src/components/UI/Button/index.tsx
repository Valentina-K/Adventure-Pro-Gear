import clsx from 'clsx';
import styles from './style.module.css';

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'transparent';
  size?: 'small' | 'medium' | 'large';
  full?: boolean
  icon?: React.ReactNode;
}

export function Button({ children, color, className, icon, full, size, ...props }: ButtonProps) {
  const buttonClassNames = clsx(styles.button, styles[color || 'primary'], styles[size || 'large'] , full && styles.full, className);

  return (
    <button className={buttonClassNames} {...props}>
      {children}
      {icon}
    </button>
  );
}
