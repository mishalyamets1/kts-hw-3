import { useNavigate } from 'react-router-dom';
import Text from '@/components/ui-kit/Text';
import styles from './RemoveButton.module.scss';

const RemoveButton = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <button className={styles.removeButton} onClick={() => navigate('/')}>
        <img src="/svg/arrow-left.svg" alt="back arrow" />
        <Text view="p-20" color="primary">
          Back
        </Text>
      </button>
    </div>
  );
};

export default RemoveButton;
