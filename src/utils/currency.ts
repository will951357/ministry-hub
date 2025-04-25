
export const formatToBRL = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const parseBRLString = (value: string): number => {
  // Remove currency symbol, dots and replace comma with dot
  const numericString = value
    .replace(/[R$\s.]/g, '')
    .replace(',', '.');
  return Number(numericString) || 0;
};

