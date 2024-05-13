export async function fakeApiCall() {
	await new Promise((resolve) => setTimeout(resolve, 300));
}
