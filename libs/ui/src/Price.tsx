export interface PriceProps {
  value: number;
}

export function Price({ value }: PriceProps) {
  return <span>${value.toFixed(2)}</span>;
}
