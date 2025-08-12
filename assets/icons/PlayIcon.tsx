import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
	sizes?: string | number | undefined;
	color?: string;
	style?: any;
	className?: string;
}
function PlayIcon({ sizes = 24, color, style, className }: IProps) {
	return (
		<Svg
			width={sizes}
			height={sizes}
			style={style}
			className={className}
			color={color}
			viewBox='0 0 24 24'
			fill='none'>
			<Path
				d='M5 5.274C5 3.567 6.826 2.482 8.325 3.297L20.687 10.024C22.253 10.876 22.253 13.124 20.687 13.976L8.325 20.702C6.826 21.518 5 20.432 5 18.726V5.274Z'
				fill='currentColor'
			/>
		</Svg>
	);
}

export default PlayIcon;
