import React from 'react';
import Svg, {
	Defs,
	FeBlend,
	FeColorMatrix,
	FeComposite,
	FeFlood,
	FeGaussianBlur,
	FeOffset,
	Filter,
	G,
	Path,
} from 'react-native-svg';

interface IProps {
	height?: string | number | undefined;
	width?: string | number | undefined;
	color?: string;
	style?: any;
	className?: string;
}
function HalfMoonIcon({
	height = 24,
	width = 24,
	color,
	style,
	className,
}: IProps) {
	return (
		<Svg
			width={height}
			height={width}
			style={style}
			className={className}
			color={color}
			viewBox='0 0 30 26'
			fill='none'>
			<G filter='url(#filter0_d_638_122)'>
				<Path
					fill-rule='evenodd'
					clip-rule='evenodd'
					d='M14.3503 2.802C12.6146 2.98759 10.9668 3.66056 9.59735 4.74312C8.22792 5.82569 7.19278 7.27366 6.61155 8.9197C6.03032 10.5657 5.92673 12.3427 6.31276 14.0451C6.69878 15.7475 7.55866 17.306 8.79302 18.5403C10.0274 19.7747 11.5858 20.6345 13.2882 21.0206C14.9907 21.4066 16.7676 21.303 18.4136 20.7218C20.0597 20.1406 21.5076 19.1054 22.5902 17.736C23.6728 16.3666 24.3457 14.7188 24.5313 12.983C23.8977 13.7881 23.1007 14.4497 22.1927 14.9243C21.2848 15.3989 20.2866 15.6757 19.2639 15.7364C18.2412 15.7972 17.2172 15.6404 16.2595 15.2766C15.3018 14.9128 14.4321 14.3501 13.7076 13.6257C12.9832 12.9013 12.4205 12.0315 12.0567 11.0738C11.6929 10.1161 11.5362 9.09213 11.5969 8.06944C11.6576 7.04674 11.9344 6.04852 12.409 5.14059C12.8836 4.23265 13.5453 3.43561 14.3503 2.802ZM4.58333 12C4.58333 6.063 9.39633 1.25 15.3333 1.25C16.0503 1.25 16.4083 1.821 16.4703 2.276C16.5293 2.714 16.3673 3.271 15.8643 3.575C15.1173 4.02586 14.4826 4.64082 14.0085 5.37331C13.5343 6.10579 13.2331 6.93658 13.1276 7.80274C13.0221 8.6689 13.1151 9.54771 13.3996 10.3726C13.6841 11.1975 14.1525 11.9468 14.7695 12.5638C15.3865 13.1808 16.1358 13.6493 16.9607 13.9338C17.7856 14.2182 18.6644 14.3112 19.5306 14.2058C20.3967 14.1003 21.2275 13.799 21.96 13.3249C22.6925 12.8507 23.3075 12.2161 23.7583 11.469C24.0623 10.966 24.6193 10.804 25.0573 10.863C25.5123 10.925 26.0833 11.283 26.0833 12C26.0833 17.937 21.2703 22.75 15.3333 22.75C9.39633 22.75 4.58333 17.937 4.58333 12Z'
					fill='white'
				/>
			</G>
			<Defs>
				<Filter
					id='filter0_d_638_122'
					x='-0.666672'
					y='0'
					width='32'
					height='32'
					filterUnits='userSpaceOnUse'
					color-interpolation-filters='sRGB'>
					<FeFlood
						floodOpacity='0'
						result='BackgroundImageFix'
					/>
					<FeColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<FeOffset dy='4' />
					<FeGaussianBlur stdDeviation='2' />
					<FeComposite
						in2='hardAlpha'
						operator='out'
					/>
					<FeColorMatrix
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
					/>
					<FeBlend
						mode='normal'
						in2='BackgroundImageFix'
						result='effect1_dropShadow_638_122'
					/>
					<FeBlend
						mode='normal'
						in='SourceGraphic'
						in2='effect1_dropShadow_638_122'
						result='shape'
					/>
				</Filter>
			</Defs>
		</Svg>
	);
}

export default HalfMoonIcon;
