import Text from 'components/ui-kit/Text';
import React from 'react';
import styles from './RemoveButton.module.scss';
import { useNavigate } from 'react-router-dom';
const RemoveButton = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <button className={styles.removeButton} onClick={() => navigate('/')}>
        <img src="/svg/arrow-right.svg" alt="back arrow" />
        <Text view="p-20" color="primary">
          Назад
        </Text>
      </button>
    </div>
  );
};

export default RemoveButton;
