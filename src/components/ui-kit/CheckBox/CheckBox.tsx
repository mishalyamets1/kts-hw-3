import classNames from 'classnames';
import clsx from 'clsx';
import React from 'react';
import CheckIcon from '@/components/ui-kit/icons/CheckIcon';
import styles from './CheckBox.module.scss';
export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  checked,
  disabled,
  className,
  ...props
}) => {
  return (
    <label className={classNames(styles.checkboxWrapper, className, { disabled, checked })}>
      <input
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
        className={styles.checkboxInput}
        checked={checked}
        disabled={disabled}
        {...props}
      />
      <span className={styles.checkboxBox}>
        {checked && (
          <CheckIcon
            width={40}
            height={40}
            color={disabled ? 'secondary' : 'accent'}
            className={clsx(styles.checkbox, { [styles.checkIcon]: disabled })}
          />
        )}
      </span>
    </label>
  );
};

export default CheckBox;
