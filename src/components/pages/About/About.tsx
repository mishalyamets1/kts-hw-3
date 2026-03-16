'use client';

import Text from '@/components/ui-kit/Text';
import { useI18n } from '@/components/providers/I18nProvider';
import styles from './About.module.scss';

const About = () => {
  const { t } = useI18n();

  const highlights = [
    {
      title: t('about.highlight.stack.title'),
      description: t('about.highlight.stack.description'),
    },
    {
      title: t('about.highlight.details.title'),
      description: t('about.highlight.details.description'),
    },
    {
      title: t('about.highlight.practice.title'),
      description: t('about.highlight.practice.description'),
    },
  ];

  return (
    <section className={styles.about}>
      <Text view="title" color="primary" tag="h1" className={styles.title}>
        {t('about.title')}
      </Text>

      <div className={styles.intro}>
        <Text view="p-18" color="primary">
          {t('about.intro.main')}
        </Text>
        <Text view="p-16" color="secondary">
          {t('about.intro.stack')}
        </Text>
      </div>

      <div className={styles.grid}>
        {highlights.map((item) => (
          <article key={item.title} className={styles.card}>
            <Text view="p-20" weight="bold" color="primary" tag="h2">
              {item.title}
            </Text>
            <Text view="p-16" color="secondary">
              {item.description}
            </Text>
          </article>
        ))}
      </div>

      <div className={styles.story}>
        <Text view="p-20" color="primary" weight="bold" tag="h2" className={styles.storyTitle}>
          {t('about.story.title')}
        </Text>
        <Text view="p-18" color="primary" className={styles.storyText}>
          {t('about.story.text')}
        </Text>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <Text view="subtitle" color="accent" tag="p">
            5+
          </Text>
          <Text view="p-16" color="secondary">
            {t('about.stats.tech')}
          </Text>
        </div>
        <div className={styles.statItem}>
          <Text view="subtitle" color="accent" tag="p">
            100%
          </Text>
          <Text view="p-16" color="secondary">
            {t('about.stats.adaptive')}
          </Text>
        </div>
        <div className={styles.statItem}>
          <Text view="subtitle" color="accent" tag="p">
            1
          </Text>
          <Text view="p-16" color="secondary">
            {t('about.stats.goal')}
          </Text>
        </div>
      </div>
    </section>
  );
};

export default About;
