import React from 'react';
import Loader from '../Loader';
import Text from '../Text';
import classNames from 'classnames';
import styles from './Button.module.scss'
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({loading, children, className, disabled, ...rest}) => {
  const isDisabled = disabled || loading
  const buttonClass = classNames(
    styles.button,
    {
      [styles['button--loading']]: loading,
      [styles['button--disabled']]: disabled
    },
    className
  )
  return <button className={buttonClass} disabled={isDisabled} {...rest}>
        {loading && (
          <Loader size='s' style={{color: 'white'}}/>
            
        )}
          <Text view='button'>{children}</Text>
  </button>
};

export default Button;
 