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
			className={className}
			style={style}
			color={color}
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill='none'>
			<Path
				d='M16.882 20.257C19.675 17.92 16.719 14.787 13.65 14.787C11.488 6.578 -1.19701 13.368 4.42399 19.556M11 8.089C11 5.69 12.57 3.268 15.506 3C12.886 6.498 17.454 11.034 21 8.449C20.85 10.05 19.917 11.401 18.631 12.205'
				stroke='white'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	);
}

export default MoonCloud;
