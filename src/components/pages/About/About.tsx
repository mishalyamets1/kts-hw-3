import Text from '@/components/ui-kit/Text';
import styles from './About.module.scss';

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.title}></div>
      <Text view="title" color="primary">
        About us
      </Text>

      <div className={styles.content}>
        <Text view="p-18" color="primary">
          Меня зовут Лямец Михаил, я начинающий фронтенд-разработчик. Увлекаюсь созданием красивых и функциональных веб-приложений. Данный проект был разработан в рамках курса "Начинающий React-разработчик" от компании KTS. Проект демонстрирует навыки использования таких современных технологий разработки как React, TypeScript, MobX, Next.js, SCSS.
        </Text>
      </div>
    </div>
  );
};

export default About;
