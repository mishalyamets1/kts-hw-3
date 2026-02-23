import classNames from 'classnames';
import React from 'react';
import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, className, afterSlot, disabled, ...rest }, ref) => {
    return (
      <div className={classNames(styles.input__wrapper, className)}>
        <input
          ref={ref}
          type="text"
          className={styles.input}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          {...rest}
        />
        {afterSlot && <div className={styles.input_after}>{afterSlot}</div>}
      </div>
    );
  }
);

export default Input;
