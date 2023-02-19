import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import CardGrid from '../CardGrid';

it('renders CardGrid', async () => {
  const { findByTestId } = render(<CardGrid />);

  const cardGridClass = await findByTestId('card-grid', { exact: false });
  expect(cardGridClass).toBeInTheDocument();
});
