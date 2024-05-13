"use client";

import { useCart } from "@/store/cart";
import {
	ActionIcon,
	Box,
	Button,
	Container,
	InputLabel,
	RangeSlider,
	Select,
	Skeleton,
	TextInput,
} from "@mantine/core";
import Image from "next/image";

const CATEGORIES = ["cloud", "design-patterns", "mongodb", "javascript"];

import {
	IconSearch,
	IconShoppingCartPlus,
	IconX
} from "@tabler/icons-react";
import { DataTable, DataTableProps } from "mantine-datatable";
import { toast } from "sonner";
import { PAGE_SIZE, TBook, useBooks } from "../hooks/use-books";

export default function Books() {
	const {
		books,
		total,
		sortStatus,
		page,
		setSortStatus,
		setPage,
		isLoading,
		filters,
		handleFilter,
	} = useBooks();

	const addToCart = useCart((state) => state.addItem);
	const cartItems = useCart((state) => state.items);

	const columns: DataTableProps<TBook>["columns"] = [
		{
			accessor: "title",
			sortable: true,
			render: ({ image, title }) => (
				<Box
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Image
						src={image}
						width={100}
						height={150}
						alt={title}
						style={{ objectFit: "contain" }}
					/>
					<Box component="span" fw={500}>
						{title}
					</Box>
				</Box>
			),
			filter: (
				<TextInput
					label="Titles"
					placeholder="Search titles..."
					leftSection={<IconSearch size={16} />}
					name="title"
					rightSection={
						<ActionIcon
							size="sm"
							variant="transparent"
							c="dimmed"
							onClick={() => handleFilter("title", "")}
						>
							<IconX size={14} />
						</ActionIcon>
					}
					value={filters.title}
					onChange={(e) => handleFilter("title", e.currentTarget.value)}
				/>
			),
			filtering: filters.title !== "",
		},
		{
			accessor: "author",
			sortable: true,
			width: 158,
			filter: (
				<TextInput
					label="Authors"
					placeholder="Search authors..."
					leftSection={<IconSearch size={16} />}
					name="title"
					rightSection={
						<ActionIcon
							size="sm"
							variant="transparent"
							c="dimmed"
							onClick={() => handleFilter("author", "")}
						>
							<IconX size={14} />
						</ActionIcon>
					}
					value={filters.author}
					onChange={(e) => handleFilter("author", e.currentTarget.value)}
				/>
			),
			filtering: filters.author !== "",
		},
		{
			accessor: "price",
			width: 90,
			render: ({ price }) => (
				<Box
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					${price}
				</Box>
			),
			filter: (
				<RangeSlider
					w={250}
					minRange={1}
					min={0}
					max={80}
					step={1}
					value={[filters.price[0], filters.price[1]]}
					onChange={(value) => handleFilter("price", value)}
				/>
			),
		},
		{
			accessor: "category",
			width: 135,
			filter: (
				<>
					<InputLabel
						sx={{
							display: "flex",
							gap: 5,
							marginBottom: 5,
							justifyContent: "space-between",
						}}
					>
						Category
					</InputLabel>
					<Select
						placeholder="Select Category"
						name="category"
						data={CATEGORIES}
						value={filters.category}
						clearable
						onChange={(value) => handleFilter("category", value!)}
					/>
				</>
			),
			filtering: filters.category !== "",
		},
		{
			accessor: "actions",
			width: 95,
			render: (row) => {
				const cartItem = cartItems.find((item) => item.book.id === row.id);

				return (
					<Box
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Button
							variant="default"
							onClick={() => {
								addToCart(row);
								toast.success("Add to cart!");
							}}
						>
							<IconShoppingCartPlus stroke={1} />
							<Box ml={5} c={"green"} fw={500}>
								{cartItem && cartItem?.quantity}
							</Box>
						</Button>
					</Box>
				);
			},
		},
	];

	return (
		<Container size={"xl"}>
			<DataTable
				height="80dvh"
				withTableBorder
				withColumnBorders
				striped
				highlightOnHover
				sortStatus={sortStatus}
				onSortStatusChange={setSortStatus}
				columns={columns}
				records={books}
				totalRecords={total}
				recordsPerPage={PAGE_SIZE}
				page={page}
				loadingText="loading..."
				fetching={isLoading}
				onPageChange={setPage}
			/>
		</Container>
	);
}

export function TableSkeleton() {
	const columns: DataTableProps<TBook>["columns"] = [
		{
			accessor: "title",
			sortable: true,
			render: () => (
				<Box
					style={{
						display: "flex",
						alignItems: "center",
						gap: 10,
					}}
				>
					<Skeleton width={100} height={150} />
					<Box component="span" fw={500}>
						<Skeleton
							w={Math.floor(Math.random() * (300 - 100)) + 100}
							h={25}
						/>
					</Box>
				</Box>
			),
		},
		{
			accessor: "author",
			sortable: true,
			width: 158,
			render: (row) => <Skeleton w={100} h={25} />,
		},
		{
			accessor: "price",
			width: 90,
			render: (row) => <Skeleton w={70} h={25} />,
		},
		{
			accessor: "category",
			width: 135,
			render: (row) => <Skeleton w={80} h={25} />,
		},
		{
			accessor: "actions",
			width: 95,
			render: (row) => <Skeleton w={50} h={40} />,
		},
	];

	return (
		<DataTable
			height="80dvh"
			withTableBorder
			withColumnBorders
			striped
			columns={columns}
			records={[
				...new Array(5).fill({
					title: "MongoDB and Python",
					subtitle:
						"Patterns and processes for the popular document-oriented database",
					isbn13: "9781449310370",
					price: "6.88",
					image: "https://itbook.store/img/books/9781449310370.png",
					url: "https://itbook.store/books/9781449310370",
					category: "mongodb",
					author: "John Vlissides",
					id: 3,
				}),
			]}
			totalRecords={5}
			recordsPerPage={PAGE_SIZE}
			page={1}
			onPageChange={() => {}}
			loadingText="loading..."
		/>
	);
}
