import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TBook } from "../app/hooks/use-books";

export type TCartItem = {
	book: TBook;
	quantity: number;
};

type TCartState = {
	items: TCartItem[];
	addItem: (book: TBook) => void;
	removeItem: (bookId: number) => void;
	clearCart: () => void;
	increaseQuantity: (bookId: number) => void;
	decreaseQuantity: (bookId: number) => void;
};

const increaseBookItemQuantity = (list: Array<TCartItem>, bookId: number) =>
	list.map((item) =>
		item.book.id === bookId ? { ...item, quantity: item.quantity + 1 } : item
	);

const removeBookFromCart = (list: Array<TCartItem>, bookId: number) =>
	list.filter((item) => item.book.id !== bookId);

export const useCart = create<TCartState>()(
	persist(
		(set) => ({
			items: [],
			addItem: (book) =>
				set((state) => {
					const bookItem = state.items.find((item) => item.book.id === book.id);
					if (bookItem)
						return { items: increaseBookItemQuantity(state.items, book.id) };
					return { items: [...state.items, { book: book, quantity: 1 }] };
				}),
			increaseQuantity: (bookId) =>
				set((state) => ({
					items: increaseBookItemQuantity(state.items, bookId),
				})),
			decreaseQuantity: (bookId) =>
				set((state) => {
					const bookItem = state.items.find((item) => item.book.id === bookId);
					if (bookItem && bookItem.quantity > 1)
						return {
							items: state.items.map((item) =>
								item.book.id === bookId
									? { ...item, quantity: item.quantity - 1 }
									: item
							),
						};
					return {
						items: removeBookFromCart(state.items, bookId),
					};
				}),
			removeItem: (bookId) =>
				set((state) => ({
					items: removeBookFromCart(state.items, bookId),
				})),
			clearCart: () => set({ items: [] }),
		}),
		{
			name: "cart-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
