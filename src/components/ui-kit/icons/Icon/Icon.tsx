import * as React from 'react'

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
    width?: number;
    height?: number;
};
const colorMap = {
    primary: '#000000',
    secondary: '#AFADB5',
    accent: '#518581'
}
const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({className, color, width=24, height=24, children, ...rest}) => {
    const fillColor = color ? colorMap[color] : 'currentColor'
    return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={className} viewBox="0 0 24 24" color={fillColor} {...rest}>
{children}
</svg>
}

export default Icon;
