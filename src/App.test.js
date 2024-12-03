import { render, screen } from '@testing-library/react';
import App from './App';

test('renders "Learn React" link', () => {
  
  render(<App />);

  // Use getByRole to target the link more specifically
  const linkElement = screen.getByRole('link', { name: /learn react/i });

 
  expect(linkElement).toBeInTheDocument();
});
