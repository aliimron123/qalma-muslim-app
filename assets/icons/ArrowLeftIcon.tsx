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
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill='none'
			color={color}
			className={className}
			style={style}>
			<Path
				d='M22 13V11H5.828L9.778 7.05L8.364 5.636L2 12L8.364 18.364L9.778 16.95L5.828 13H22Z'
				fill='white'
			/>
		</Svg>
	);
}

export default HomeIcon;
