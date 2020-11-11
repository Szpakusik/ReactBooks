import { render, screen } from '@testing-library/react';
import App from '../App';
import store from "../Store/store";
import { Provider } from "react-redux";

test('Renders search paragraph', () => {
  render(
  <Provider store={store}>
    <App />
  </Provider>);
  const linkElement = screen.getByText(/Znajdź książkę dla siebie!/i);
  expect(linkElement).toBeInTheDocument();
});
