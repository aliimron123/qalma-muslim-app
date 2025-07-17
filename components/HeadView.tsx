import React from 'react';
import { ThemedView } from './ThemedView';

function HeadView({ children }: { children: React.ReactNode }) {
	return <ThemedView className='py-8'>{children}</ThemedView>;
}

export default HeadView;
