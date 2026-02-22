import * as React from 'react'

export type TextProps = {
    /** Дополнительный класс */
    className?: string;
    /** Стиль отображения */
    view?: 'title' | 'button' | 'subtitle' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    /** Html-тег */
    tag?:  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    /** Начертание шрифта */
    weight?: 'normal' | 'medium' | 'bold';
    /** Контент */
    children: React.ReactNode;
    /** Цвет */
    color?: 'primary' | 'secondary' | 'accent';
    /** Максимальное кол-во строк */
    maxLines?: number;
};
type baseStyle = {
    fontSize: string,
    lineHeight: string,
    fontWeight: string
}
const viewStyles: Record<Exclude<TextProps['view'], undefined>, baseStyle> = {
    title: {fontSize: '44px', lineHeight: '48px', fontWeight: '700'},
    subtitle: {fontSize: '32px', lineHeight: '36px', fontWeight: '700'},
    button: {fontSize: '18px', lineHeight: '18px', fontWeight: '400'},
    'p-20': {fontSize: '20px', lineHeight: '24px', fontWeight: '400'},
    'p-18': {fontSize: '18px', lineHeight: '22px', fontWeight: '400'},
    'p-16': {fontSize: '16px', lineHeight: '20px', fontWeight: '400'},
    'p-14': {fontSize: '14px', lineHeight: '18px', fontWeight: '400'},
}
const weightMap = {
    normal: 400,
    medium: 500,
    bold: 700
}
const Text: React.FC<TextProps> = ({className, view, tag, weight, children, color, maxLines}) => {
    const Tag = tag || 'p'
    const baseStyle = view ? viewStyles[view] : {} as baseStyle
    const style: React.CSSProperties = {
        fontSize: baseStyle.fontSize,
        lineHeight: baseStyle.lineHeight,
        fontWeight: weight ? weightMap[weight] : baseStyle.fontWeight,
        color: color ? `var(--text-${color})` : 'inherit',
        display: maxLines ? '-webkit-box' : undefined,
        overflow: maxLines ? 'hidden' : undefined,
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical'

    }
    return React.createElement(Tag, {style, className}, children)
}

export default Text;
