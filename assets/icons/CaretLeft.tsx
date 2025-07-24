import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
	height?: string | number | undefined;
	width?: string | number | undefined;
	color?: string;
	style?: any;
	className?: string;
}
function CaretLeft({
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
			style={style}
			className={className}
			color={color}
			viewBox='0 0 24 24'
			fill='none'>
			<Path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M14.601 4.47001C14.7415 4.61064 14.8203 4.80126 14.8203 5.00001C14.8203 5.19876 14.7415 5.38939 14.601 5.53001L8.237 11.894C8.21372 11.9172 8.19525 11.9448 8.18265 11.9752C8.17004 12.0056 8.16355 12.0381 8.16355 12.071C8.16355 12.1039 8.17004 12.1365 8.18265 12.1668C8.19525 12.1972 8.21372 12.2248 8.237 12.248L14.601 18.612C14.7335 18.7542 14.8056 18.9422 14.8022 19.1365C14.7987 19.3308 14.72 19.5162 14.5826 19.6536C14.4452 19.791 14.2598 19.8698 14.0655 19.8732C13.8712 19.8766 13.6832 19.8045 13.541 19.672L7.177 13.31C7.01448 13.1475 6.88556 12.9546 6.7976 12.7422C6.70965 12.5299 6.66438 12.3023 6.66438 12.0725C6.66438 11.8427 6.70965 11.6151 6.7976 11.4028C6.88556 11.1904 7.01448 10.9975 7.177 10.835L13.54 4.47001C13.6806 4.32956 13.8713 4.25067 14.07 4.25067C14.2688 4.25067 14.4604 4.32956 14.601 4.47001Z'
				fill='currentColor'
			/>
		</Svg>
	);
}

export default CaretLeft;
