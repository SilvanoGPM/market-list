export function formatTotal(total: number): string {
  const totalFormatted = total.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  });

  return `R$ ${totalFormatted}`;
}
