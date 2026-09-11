import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ProductList from './ProductList';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="shop-app">
      <h1>Shop Remote</h1>
      <p>This application can run independently and is also exposed to Shell through Module Federation.</p>
      <ProductList />
    </main>
  </StrictMode>
);
