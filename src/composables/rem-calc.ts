export function useRemCalc(px: number | string, base = 16) {
	const temporaryPx = typeof px === 'string' ? Number.parseInt(px.replace('px', '')) : px;
	return `${(1 / base) * temporaryPx}rem`;
}
