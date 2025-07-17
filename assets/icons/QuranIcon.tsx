import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IProps {
	height?: string | number | undefined;
	width?: string | number | undefined;
	color?: string;
	style?: any;
	className?: string;
}
function QuranIcon({
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
			color={color}
			style={style}
			className={className}
			viewBox='0 0 24 24'
			fill='none'>
			<Path
				d='M20.5 17H6C5.33696 17 4.70107 17.2634 4.23223 17.7322C3.76339 18.2011 3.5 18.837 3.5 19.5C3.5 20.163 3.76339 20.7989 4.23223 21.2678C4.70107 21.7366 5.33696 22 6 22H20.5'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M20.5 22C19.837 22 19.2011 21.7366 18.7322 21.2677C18.2634 20.7989 18 20.163 18 19.5C18 18.8369 18.2634 18.2011 18.7322 17.7322C19.2011 17.2634 19.837 17 20.5 17M14.934 11C14.6808 11.4198 14.3354 11.7765 13.9239 12.043C13.5125 12.3095 13.0457 12.4788 12.5591 12.5382C12.0725 12.5975 11.5787 12.5453 11.1152 12.3855C10.6517 12.2257 10.2307 11.9626 9.88408 11.6159C9.53743 11.2692 9.27423 10.8482 9.11443 10.3848C8.95464 9.92129 8.90244 9.42753 8.96179 8.94089C9.02115 8.45425 9.19049 7.98751 9.457 7.57604C9.72351 7.16456 10.0802 6.81915 10.5 6.56598M13.5 7.99998H13.509'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M3.5 19.5V5.5C3.5 4.57174 3.86875 3.6815 4.52513 3.02513C5.1815 2.36875 6.07174 2 7 2H17C17.9283 2 18.8185 2.36875 19.4749 3.02513C20.1313 3.6815 20.5 4.57174 20.5 5.5V17'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	);
}

export default QuranIcon;
