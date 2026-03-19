 'use client';

import classNames from 'classnames';
import React, { useRef, useImperativeHandle } from 'react';
import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, className, afterSlot, disabled, ...rest }, ref) => {
    const internalRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(ref, () => internalRef.current as HTMLInputElement, [internalRef]);

    return (
      <div
        className={classNames(styles.input__wrapper, className)}
        onClick={() => internalRef.current?.focus()}
      >
        <input
          ref={internalRef}
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

Input.displayName = 'Input';

export default Input;
