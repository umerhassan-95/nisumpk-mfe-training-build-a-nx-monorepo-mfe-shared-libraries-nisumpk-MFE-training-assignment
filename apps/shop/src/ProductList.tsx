import { Button, Card, Price } from '@nx-mfe/ui';
import { products } from './products';

export default function ProductList() {
  const handleAddToCart = (name: string) => {
    window.alert(`${name} added to cart`);
  };

  return (
    <section>
      <h2>Shop Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <Card key={product.id}>
            <h3>{product.name}</h3>
            <p className="price">
              <Price value={product.price} />
            </p>
            <Button
              label="Add to Cart"
              onClick={() => handleAddToCart(product.name)}
            />
          </Card>
        ))}
      </div>
    </section>
  );
}
