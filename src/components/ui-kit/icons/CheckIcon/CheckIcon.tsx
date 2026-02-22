import * as React from 'react'
import Icon, { IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = (props ) => {
   

    return <Icon {...props}>
        <path xmlns="http://www.w3.org/2000/svg" d="M4 11.6129L9.87755 18L20 7" stroke='currentColor' fill='none' strokeWidth={2}/>
    </Icon>
}

export default CheckIcon;
