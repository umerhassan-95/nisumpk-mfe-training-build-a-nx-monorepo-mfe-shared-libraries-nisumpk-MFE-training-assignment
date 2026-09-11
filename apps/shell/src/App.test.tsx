import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('Shell', () => {
  it('renders the host application', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Shell Host' })).toBeInTheDocument();
  });
});
