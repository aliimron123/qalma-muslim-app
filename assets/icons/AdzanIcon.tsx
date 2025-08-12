import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
interface IProps {
	height?: string | number | undefined;
	width?: string | number | undefined;
	sizes?: string | number | undefined;
	color?: string;
	style?: any;
	className?: string;
}
function Adzan({
	height = 30,
	width = 30,
	sizes = 24,
	color,
	style,
	className,
}: IProps) {
	return (
		<Svg
			height={height || sizes}
			width={width || sizes}
			viewBox='0 0 512 512'
			style={style}
			className={className}
			color={color}>
			<G
				id='Adzan_Line'
				data-name='Adzan Line'
				fill='currentColor'>
				<Path
					id='shading'
					d='m208 400h96v8h-96z'></Path>
				<Path
					id='line_opening'
					d='m312 408h-112v-72a24 24 0 0 1 16-22.63v-1.37a24 24 0 0 1 17-23 24 24 0 0 1 46 0 24 24 0 0 1 17 23v1.37a24 24 0 0 1 16 22.63zm-96-16h80v-56a8 8 0 0 0 -8-8h-8v-16a8 8 0 0 0 -8-8h-8v-8a8 8 0 0 0 -16 0v8h-8a8 8 0 0 0 -8 8v16h-8a8 8 0 0 0 -8 8z'
					data-name='line opening'></Path>
				<Path
					id='sound'
					d='m90.34 449.66c-51.64-51.66-51.64-135.66 0-187.32l11.32 11.32a116.56 116.56 0 0 0 0 164.68z'></Path>
				<Path
					id='sound-2'
					d='m118.34 421.66a93 93 0 0 1 0-131.32l11.32 11.32a76.92 76.92 0 0 0 0 108.68z'
					data-name='sound'></Path>
				<Path
					id='sound-3'
					d='m146.34 393.66a53.33 53.33 0 0 1 0-75.32l11.32 11.32a37.28 37.28 0 0 0 0 52.68z'
					data-name='sound'></Path>
				<Path
					id='sound-4'
					d='m365.66 393.66-11.32-11.32a37.28 37.28 0 0 0 0-52.68l11.32-11.32a53.33 53.33 0 0 1 0 75.32z'
					data-name='sound'></Path>
				<Path
					id='sound-5'
					d='m393.66 421.66-11.32-11.32a76.92 76.92 0 0 0 0-108.68l11.32-11.32a93 93 0 0 1 0 131.32z'
					data-name='sound'></Path>
				<Path
					id='sound-6'
					d='m421.66 449.66-11.32-11.32a116.56 116.56 0 0 0 0-164.68l11.32-11.32c51.64 51.66 51.64 135.66 0 187.32z'
					data-name='sound'></Path>
				<Path
					id='minaret'
					d='m352 224v-16h-8a88.11 88.11 0 0 0 -80-87.63v-9a47.61 47.61 0 0 0 36.36-28.22l4.73-11.15h-17.09a24 24 0 0 1 -24-24c0-8.25 2-14.74 5.6-18.29l14-13.71h-27.6a48 48 0 0 0 -8 95.32v9.05a88.11 88.11 0 0 0 -80 87.63h-8v16h8v16h-8v16h8v168h-8v16h8v56h16v-56h144v56h16v-56h8v-16h-8v-168h8v-16h-8v-16zm-128-160a32.06 32.06 0 0 1 26.1-31.46 54.47 54.47 0 0 0 -2.1 15.46 40.07 40.07 0 0 0 30.74 38.92 32.59 32.59 0 0 1 -22.74 9.08 32 32 0 0 1 -32-32zm32 72a72.08 72.08 0 0 1 72 72h-144a72.08 72.08 0 0 1 72-72zm72 288h-144v-168h144zm0-184h-144v-16h144z'></Path>
			</G>
		</Svg>
	);
}

export default Adzan;
