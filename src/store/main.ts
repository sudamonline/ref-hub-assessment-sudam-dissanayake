import { create } from "zustand";

type TMainStoreState = {
	sidebarCartOpened: boolean;
	closeSidebarCart: () => void;
	openSidebarCart: () => void;
};

export const useMainStore = create<TMainStoreState>()((set) => ({
	sidebarCartOpened: false,
	closeSidebarCart: () => set({ sidebarCartOpened: false }),
	openSidebarCart: () => set({ sidebarCartOpened: true }),
}));
