import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the dashboard overview', async () => {
  render(<App />);
  expect(await screen.findByRole('heading', { level: 1, name: /مرحباً/ })).toBeInTheDocument();
});
