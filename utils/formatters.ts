// https://gist.github.com/kafeltz/1b99cbaa9dc2142e04ca

export function formatPriceToBrazilStyle(total: number): string {
  const formattedTotal = total
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  return `R$ ${formattedTotal}`;
}
