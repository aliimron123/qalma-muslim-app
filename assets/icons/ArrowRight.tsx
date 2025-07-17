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
			style={style}
			className={className}
			width={width}
			height={height}
			viewBox='0 0 31 30'
			color={color}
			fill='none'>
			<Path
				d='M25.5387 25.9875C26.1137 26.5625 27.0012 25.675 26.4262 25.1125L21.7387 20.4125C23.3834 18.5934 24.2924 16.2274 24.2887 13.775C24.2887 8.2875 19.8262 3.825 14.3387 3.825C8.85125 3.825 4.38875 8.2875 4.38875 13.775C4.38875 19.2625 8.85125 23.725 14.3387 23.725C16.8137 23.725 19.1012 22.8125 20.8512 21.3L25.5387 25.9875ZM5.6375 13.775C5.6375 8.975 9.55 5.075 14.3375 5.075C19.1375 5.075 23.0375 8.975 23.0375 13.775C23.0375 18.575 19.1375 22.475 14.3375 22.475C9.55 22.475 5.6375 18.575 5.6375 13.775Z'
				fill='currentColor'
			/>
		</Svg>
	);
}

export default HomeIcon;
