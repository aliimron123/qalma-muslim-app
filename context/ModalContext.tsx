import React, { createContext, ReactNode, useState } from 'react';

export interface ModalContextProps {
	isModalOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}

interface ModalProviderProps {
	children: ReactNode;
}

export const ModalContext = createContext<ModalContextProps | undefined>(
	undefined,
);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
			{children}
		</ModalContext.Provider>
	);
};
