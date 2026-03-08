import ArrowDownIcon from '@/components/ui-kit/icons/ArrowDownIcon';
import CheckIcon from '@/components/ui-kit/icons/CheckIcon';
import type { IconProps } from '@/components/ui-kit/icons/Icon';

export default {
  title: 'Icons',
  argTypes: {
    className: {
      control: 'text',
    },
    color: {
      options: ['primary', 'secondary', 'accent'],
      mapping: ['primary', 'secondary', 'accent'],
      control: 'select',
    },
    width: {
      control: 'number',
    },
    height: {
      control: 'number',
    },
  },
};

export const Default = (props: IconProps) => (
  <div style={{ display: 'flex', gap: '20px' }}>
    <CheckIcon {...props} />
    <ArrowDownIcon {...props} />
  </div>
);
