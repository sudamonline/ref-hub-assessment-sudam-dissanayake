import { Box, Button, Group, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

const phoneRegex = new RegExp(
	/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	email: z
		.string()
		.email({ message: "Email invalid" })
		.min(1, { message: "Email is required" }),
	streetAddress: z.string().min(1, { message: "Street address is required" }),
	city: z.string().min(1, { message: "City is required" }),
	state: z.string().min(1, { message: "State is required" }),
	zipCode: z
		.string()
		.regex(/^\d+$/, {
			message: "Zip code must contain only numbers",
		})
		.min(1, { message: "Zip code is required" }),
	phoneNo: z
		.string()
		.regex(phoneRegex, "Invalid Mobile No")
		.min(1, { message: "Mobile No is required" })
		.max(11, { message: "Mobile No only can have 11 numbers" }),
});

export default function ShippingDetailsForm({
	handleSubmit,
}: {
	handleSubmit: (data: z.infer<typeof formSchema>) => void;
}) {
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			name: "",
			email: "",
			streetAddress: "",
			city: "",
			state: "",
			zipCode: "",
			phoneNo: "",
		},

		validate: zodResolver(formSchema),
	});

	return (
		<Box mt={10} p={20} bg={"#ededed"} sx={{ borderRadius: "5px" }}>
			<Title order={4} ta={"center"}>
				Shipping Details
			</Title>
			<form
				onSubmit={form.onSubmit(handleSubmit)}
				style={{ display: "grid", gap: "10px" }}
			>
				<TextInput
					withAsterisk
					label="Name"
					placeholder="Enter here"
					key={form.key("name")}
					{...form.getInputProps("name")}
				/>
				<TextInput
					withAsterisk
					label="Email"
					placeholder="Enter here"
					key={form.key("email")}
					{...form.getInputProps("email")}
				/>
				<TextInput
					withAsterisk
					label="Street Address"
					placeholder="Enter here"
					key={form.key("streetAddress")}
					{...form.getInputProps("streetAddress")}
				/>
				<TextInput
					withAsterisk
					label="City"
					placeholder="Enter here"
					key={form.key("city")}
					{...form.getInputProps("city")}
				/>
				<TextInput
					withAsterisk
					label="State"
					placeholder="Enter here"
					key={form.key("state")}
					{...form.getInputProps("state")}
				/>
				<TextInput
					withAsterisk
					label="Zip Code"
					placeholder="Enter here"
					key={form.key("zipCode")}
					{...form.getInputProps("zipCode")}
				/>
				<TextInput
					withAsterisk
					label="Mobile No"
					placeholder="Enter here"
					key={form.key("phoneNo")}
					{...form.getInputProps("phoneNo")}
				/>
				<Group w={"100%"} mt="md">
					<Button w={"100%"} type="submit">
						Checkout
					</Button>
				</Group>
			</form>
		</Box>
	);
}
