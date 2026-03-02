import Text from '@/components/ui-kit/Text';
import styles from '../SingleCard/SingleCard.module.scss';

const About = () => {
  return (
    <div className={styles.singleCard}>
      <Text view="title" color="primary">
        About
      </Text>
    </div>
  );
};

export default About;
