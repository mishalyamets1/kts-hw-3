import React from 'react';
import Text from '../Text';
import styles from './Card.module.scss'
import clsx from 'clsx';

// import styles from './Card.module.css'

export type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    image: string;
    /** Слот над заголовком */
    captionSlot?: React.ReactNode;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Описание карточки */
    subtitle: React.ReactNode;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    contentSlot?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    /** Слот для действия */
    actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({className='card', image, captionSlot, title, subtitle, contentSlot, onClick, actionSlot}) => {

    return <div className={clsx(styles.card, className)} onClick={onClick}>

        <div ><img src={image} className={styles.card__img} alt="картинка"/></div>  
        <div className={styles.card__text}>
            
            {captionSlot && <Text view='p-14' weight='medium' color='secondary' className={styles.card__caption} >
                {captionSlot}
            </Text>}
            <Text view='p-20' weight='medium' color='primary' maxLines={2} className={styles.card__title}>
                {title}
            </Text>
            <Text view='p-16' color='secondary' maxLines={3}>
                {subtitle}
            </Text>
                {(contentSlot || actionSlot) && <div className={styles.card__contentAction}>
                <Text view='p-18' color='primary' weight='bold'>
                {contentSlot}
                </Text>
        
        {actionSlot}
        </div>}
        </div>    

            
        
    </div>
};

export default Card;  
 
// 1. Для изображения используется html-тег `img`
// 1. В заголовке может быть максимум 2 строки
// 1. В описании может быть максимум 3 строки
// 1. Контент над заголовком необязательный (кол-во строк не ограничено)
// 1. При клике на карточку должен выполняться `onClick`
// 1. Для текстов используется компонент `Text`
// 1. При расширении/сужении карточки, изображение должно сохранять пропорции

// ```typescript
// <Card
//     image="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
//     title="Мандарин"
//     subtitle="Марокко"
//     onClick={() => console.log('Мандарин куплен!')}
// />

// <Card
//     image="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
//     title="Мандарин"
//     subtitle={<a href="/morocco">Марокко</a>}
//     contentSlot={<>299р</>}
//     actionSlot={<Button>В корзину</Button>}
// />
// ```