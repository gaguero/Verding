import styles from './Button.module.css';
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  ...props
}) => {
  const classNames = [styles.button, styles[variant], styles[size]].join(' ');

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
};
