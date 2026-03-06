import * as React from 'react';
import type { IconProps } from '@/components/ui-kit/icons/Icon';
import Icon from '@/components/ui-kit/icons/Icon';

const ArrowDownIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        fill="currentColor"
        clip-rule="evenodd"
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
      />
    </Icon>
  );
};

export default ArrowDownIcon;
