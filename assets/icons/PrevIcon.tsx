import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
	sizes?: string | number | undefined;
	color?: string;
	style?: any;
	className?: string;
}
function PrevIcon({ sizes = 24, color, style, className }: IProps) {
	return (
		<Svg
			width={sizes}
			height={sizes}
			style={style}
			color={color}
			className={className}
			viewBox='0 0 24 24'
			fill='none'>
			<Path
				d='M3 3.74999C3 3.55108 3.07902 3.36031 3.21967 3.21966C3.36032 3.07901 3.55109 2.99999 3.75 2.99999C3.94891 2.99999 4.13968 3.07901 4.28033 3.21966C4.42098 3.36031 4.5 3.55108 4.5 3.74999V20.25C4.5 20.4489 4.42098 20.6397 4.28033 20.7803C4.13968 20.921 3.94891 21 3.75 21C3.55109 21 3.36032 20.921 3.21967 20.7803C3.07902 20.6397 3 20.4489 3 20.25V3.74999ZM21 4.75299C21 3.34499 19.422 2.51299 18.26 3.30899L7.763 10.503C7.52936 10.6631 7.33809 10.8776 7.20561 11.128C7.07313 11.3783 7.00341 11.6571 7.00243 11.9404C7.00144 12.2236 7.06923 12.5029 7.19997 12.7542C7.3307 13.0054 7.52048 13.2212 7.753 13.383L18.252 20.685C19.412 21.492 21.001 20.661 21.001 19.248L21 4.75299Z'
				fill='currentColor'
			/>
		</Svg>
	);
}

export default PrevIcon;
