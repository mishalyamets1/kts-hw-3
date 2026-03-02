import clsx from 'clsx';
import React from 'react';
import Text from '../Text';
import styles from './Card.module.scss';

export type CardProps = {
  className?: string;
  image: string;
  imageAlt?: string;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className = 'card',
  image,
  imageAlt,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <div className={clsx(styles.card, className)} onClick={onClick}>
      <img src={image} className={styles.card__img} alt={imageAlt} width={360} height={360} />
      <div className={styles.card__text}>
        {captionSlot && (
          <Text view="p-14" weight="medium" color="secondary" className={styles.card__caption}>
            {captionSlot}
          </Text>
        )}

        <Text
          view="p-20"
          weight="medium"
          color="primary"
          maxLines={2}
          className={styles.card__title}
        >
          {title}
        </Text>

        <Text view="p-16" color="secondary" maxLines={3}>
          {subtitle}
        </Text>

        {(contentSlot || actionSlot) && (
          <div className={styles.card__contentAction}>
            {contentSlot && (
              <Text view="p-18" color="primary" weight="bold">
                {contentSlot}
              </Text>
            )}
            {actionSlot}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
