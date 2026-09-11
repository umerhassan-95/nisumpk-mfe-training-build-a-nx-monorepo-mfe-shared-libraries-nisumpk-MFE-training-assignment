import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button, Card, Price } from './index';

// Basic component tests required by the assignment.
describe('shared UI', () => {
  it('Button renders its label and calls onClick', () => {
    const onClick = vi.fn();
    render(<Button label="Add to Cart" onClick={onClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Add to Cart' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Card renders its children', () => {
    render(<Card>Product content</Card>);
    expect(screen.getByText('Product content')).toBeInTheDocument();
  });

  it('Price renders the currency value', () => {
    render(<Price value={99.99} />);
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });
});
