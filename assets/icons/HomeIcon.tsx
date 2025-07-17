import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
	height?: string | number | undefined;
	width?: string | number | undefined;
	color?: string;
	style?: any;
	className?: string;
}
function HomeIcon({
	height = 24,
	width = 24,
	color,
	style,
	className,
}: IProps) {
	return (
		<Svg
			width={height}
			className={className}
			height={width}
			viewBox='0 0 24 24'
			style={style}
			color={color}
			fill='none'>
			<Path
				d='M6.133 21C4.955 21 4 20.02 4 18.81V10.008C4 9.34297 4.295 8.71297 4.8 8.29797L10.667 3.47997C11.0419 3.16955 11.5133 2.99969 12 2.99969C12.4867 2.99969 12.9581 3.16955 13.333 3.47997L19.199 8.29797C19.705 8.71297 20 9.34297 20 10.008V18.81C20 20.02 19.045 21 17.867 21H6.133Z'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M9.5 21V15.5C9.5 14.9696 9.71071 14.4609 10.0858 14.0858C10.4609 13.7107 10.9696 13.5 11.5 13.5H12.5C13.0304 13.5 13.5391 13.7107 13.9142 14.0858C14.2893 14.4609 14.5 14.9696 14.5 15.5V21'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	);
}

export default HomeIcon;
