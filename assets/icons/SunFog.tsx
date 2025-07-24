import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
	height?: string | number | undefined;
	width?: string | number | undefined;
	color?: string;
	style?: any;
	className?: string;
}
function SunFog({ height = 24, width = 24, color, style, className }: IProps) {
	return (
		<Svg
			style={style}
			className={className}
			color={color}
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill='none'>
			<Path
				d='M7.99998 22H16M4.99998 19H19M1.99998 16H22'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M9.99998 6.341C11.2529 5.89752 12.6177 5.88264 13.88 6.29868C15.1424 6.71472 16.2308 7.53814 16.9746 8.6397C17.7184 9.74125 18.0753 11.0586 17.9894 12.3849C17.9035 13.7113 17.3796 14.9716 16.5 15.968H7.49998C6.53189 14.8731 5.99829 13.4615 5.99998 12C5.99998 11.299 6.11998 10.626 6.34098 10M12 2V3M22 12H21M2.99998 12H1.99998M19.07 4.93L18.678 5.323M5.32198 5.322L4.92898 4.929'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
			/>
		</Svg>
	);
}

export default SunFog;
