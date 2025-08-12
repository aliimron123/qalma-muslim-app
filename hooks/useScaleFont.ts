import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const scaleFont = (size: number) => size * (width / 375);
