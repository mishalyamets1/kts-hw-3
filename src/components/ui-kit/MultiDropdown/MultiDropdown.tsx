'use client';

import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Input from '@/components/ui-kit/Input';
import styles from './MultiDropdown.module.scss';

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  readOnly?: boolean;
  getTitle: (value: Option[]) => string;
  afterSlot?: React.ReactNode;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  readOnly,
  getTitle,
  afterSlot,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOptions = useMemo(() => {
    return options.filter((option) => option.value.toLowerCase().includes(search.toLowerCase()));
  }, [options, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleOption = (option: Option) => {
    const isSelected = value.some((v) => v.key === option.key);
    if (isSelected) {
      onChange(value.filter((v) => v.key !== option.key));
    } else {
      onChange([...value, option]);
    }
  };

  const inputValue = search !== '' ? search : value.length > 0 ? getTitle(value) : '';

  return (
    <div
      ref={wrapperRef}
      className={classNames(styles.multiDropdown, className, { disabled })}
      onClick={() => {
        if (!disabled && readOnly) setIsOpen((prev) => !prev);
      }}
    >
      <Input
        value={inputValue}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={value.length === 0 ? getTitle(value) : undefined}
        onChange={(val) => {
          if (!readOnly) {
            setSearch(val);
            setIsOpen(true);
          }
        }}
        onFocus={() => {
          if (!disabled && !readOnly) setIsOpen(true);
        }}
        afterSlot={
          afterSlot ? (
            <div
              className="multi-dropdown__after"
              onClick={(e) => {
                e.stopPropagation();
                if (!disabled) setIsOpen((prev) => !prev);
              }}
            >
              {afterSlot}
            </div>
          ) : undefined
        }
      />

      {isOpen && !disabled && (
        <div className={styles.multiDropdown__options}>
          {filteredOptions.map((option) => {
            const selected = value.some((v) => v.key === option.key);

            return (
              <div
                key={option.key}
                className={classNames(styles.multiDropdown__option, {
                  [styles.selected]: selected,
                })}
                onClick={() => toggleOption(option)}
              >
                {option.value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
