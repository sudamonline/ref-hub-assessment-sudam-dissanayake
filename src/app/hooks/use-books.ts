import { books } from "@/lib/data";
import { fakeApiCall } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { sortBy } from "lodash";
import { DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";

import { useDebouncedValue } from "@mantine/hooks";

export const PAGE_SIZE = 15;

export type TBook = {
	title: string;
	subtitle: string;
	isbn13: string;
	price: string;
	image: string;
	url: string;
	category: string;
	author: string;
	id: number;
};

export function useBooks() {
	const [filters, setFilters] = useState({
		title: "",
		author: "",
		category: "",
		price: [0, 80],
	});
	const [debouncedFilters] = useDebouncedValue(filters, 500);
	const [page, setPage] = useState(1);
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus<TBook>>({
		columnAccessor: "title",
		direction: "asc",
	});

	useEffect(() => {
		setPage(1);
	}, [debouncedFilters]);

	function getFilteredBooks() {
		return books.filter(({ title, author, category, price }) => {
			if (
				debouncedFilters.title !== "" &&
				!title
					.toLowerCase()
					.includes(debouncedFilters.title.trim().toLowerCase())
			)
				return false;

			if (
				debouncedFilters.author !== "" &&
				!author
					.toLowerCase()
					.includes(debouncedFilters.author.trim().toLowerCase())
			)
				return false;

			if (debouncedFilters.category && category !== debouncedFilters.category)
				return false;

			if (
				!(
					parseFloat(price) >= debouncedFilters.price[0] &&
					parseFloat(price) <= debouncedFilters.price[1]
				)
			)
				return false;

			return true;
		});
	}

	async function getBooks({
		page,
		recordsPerPage,
		sortStatus,
	}: {
		page: number;
		recordsPerPage: number;
		sortStatus: DataTableSortStatus<TBook>;
	}) {
		await fakeApiCall();

		// handle filtrations (title, author, category, price)
		const filteredResults = getFilteredBooks();

		let result = sortBy(filteredResults, sortStatus.columnAccessor) as TBook[];

		if (sortStatus.direction === "desc") result.reverse();

		const total = result.length;
		const skip = (page - 1) * recordsPerPage;

		result = result.slice(skip, skip + recordsPerPage);

		return { total, books: result as TBook[] };
	}

	const { data, isLoading, status } = useQuery({
		queryKey: [
			"books",
			sortStatus.columnAccessor,
			sortStatus.direction,
			page,
			debouncedFilters,
		],
		queryFn: () =>
			getBooks({
				recordsPerPage: PAGE_SIZE,
				page,
				sortStatus,
			}),
	});

	function handleFilter(name: string, value: any) {
		setFilters((prev) => ({ ...prev, [name]: value }));
	}

	return {
		books: data?.books,
		total: data?.total,
		page,
		sortStatus,
		filters,

		setPage,
		setSortStatus,
		handleFilter,
		isLoading: status === "pending" ? true : isLoading,
	};
}
