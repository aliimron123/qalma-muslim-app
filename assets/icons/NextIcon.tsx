import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
	sizes?: string | number | undefined;
	color?: string;
	style?: any;
	className?: string;
}
function NextIcon({ sizes = 24, color, style, className }: IProps) {
	return (
		<Svg
			width={sizes}
			height={sizes}
			color={color}
			style={style}
			className={className}
			viewBox='0 0 24 24'
			fill='none'>
			<Path
				d='M3 4.75299C3 3.34499 4.578 2.51299 5.74 3.30899L16.238 10.503C16.4716 10.6631 16.6629 10.8776 16.7954 11.128C16.9279 11.3783 16.9976 11.6571 16.9986 11.9404C16.9996 12.2236 16.9318 12.5029 16.801 12.7542C16.6703 13.0054 16.4805 13.2212 16.248 13.383L5.749 20.685C4.59 21.492 3 20.66 3 19.248V4.75299ZM21 3.74999C21 3.55108 20.921 3.36031 20.7803 3.21966C20.6397 3.07901 20.4489 2.99999 20.25 2.99999C20.0511 2.99999 19.8603 3.07901 19.7197 3.21966C19.579 3.36031 19.5 3.55108 19.5 3.74999V20.25C19.5 20.4489 19.579 20.6397 19.7197 20.7803C19.8603 20.921 20.0511 21 20.25 21C20.4489 21 20.6397 20.921 20.7803 20.7803C20.921 20.6397 21 20.4489 21 20.25V3.74999Z'
				fill='currentColor'
			/>
		</Svg>
	);
}

export default NextIcon;
