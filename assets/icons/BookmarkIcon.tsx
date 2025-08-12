import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
	height?: string | number | undefined;
	width?: string | number | undefined;
	sizes?: string | number | undefined;
	color?: string;
	style?: any;
	className?: string;
}
function BookmarkIcon({
	height = 24,
	width = 24,
	color,
	style,
	sizes,
	className,
}: IProps) {
	return (
		<Svg
			width={height || sizes}
			height={width || sizes}
			color={color}
			style={style}
			className={className}
			viewBox='0 0 25 24'
			fill='none'>
			<Path
				d='M8.027 20.841C7.361 21.274 6.5 20.772 6.5 19.952V3.942C6.5 3.422 6.836 3 7.25 3H17.75C18.164 3 18.5 3.422 18.5 3.942V19.952C18.5 20.772 17.639 21.274 16.973 20.842L13.027 18.28C12.8705 18.1772 12.6873 18.1224 12.5 18.1224C12.3127 18.1224 12.1295 18.1772 11.973 18.28L8.027 20.841Z'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	);
}

export default BookmarkIcon;
