export function chunkArray(array, size = 1) {
	const chunks = [];

	for (let i = 0; i < array.length; i += size) {
		const chunk = array.slice(i, i + size);
		chunks.push(chunk);
	}

	return chunks;
}

export async function getData(url) {
	const response = await fetch(url);
	if (response.ok) return response.json();
	throw new Error(response.statusText);
}
