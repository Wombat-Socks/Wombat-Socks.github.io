import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the brand in the nav', () => {
  render(<App />);
  const brand = screen.getByText(/Wombat Socks/i);
  expect(brand).toBeInTheDocument();
});
