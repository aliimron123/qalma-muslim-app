import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
	height?: string | number | undefined;
	width?: string | number | undefined;
	color?: string;
	style?: any;
	className?: string;
}
function MoonCloud({
	height = 24,
	width = 24,
	color,
	style,
	className,
}: IProps) {
	return (
		<Svg
			width={width}
			color={color}
			height={height}
			style={style}
			className={className}
			viewBox='0 0 21 20'
			fill='none'>
			<Path
				d='M10.9667 17.35C10.8307 17.4477 10.6674 17.5002 10.5 17.5002C10.3326 17.5002 10.1693 17.4477 10.0333 17.35C6.00917 14.4817 1.73833 8.58167 6.05583 4.31833C7.24112 3.15237 8.83736 2.49927 10.5 2.5C12.1667 2.5 13.7658 3.15417 14.9442 4.3175C19.2617 8.58083 14.9908 14.48 10.9667 17.35Z'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M10.5 10C10.942 10 11.366 9.82441 11.6785 9.51185C11.9911 9.19929 12.1667 8.77537 12.1667 8.33334C12.1667 7.89131 11.9911 7.46739 11.6785 7.15483C11.366 6.84227 10.942 6.66667 10.5 6.66667C10.058 6.66667 9.63405 6.84227 9.32149 7.15483C9.00893 7.46739 8.83334 7.89131 8.83334 8.33334C8.83334 8.77537 9.00893 9.19929 9.32149 9.51185C9.63405 9.82441 10.058 10 10.5 10Z'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	);
}

export default MoonCloud;
