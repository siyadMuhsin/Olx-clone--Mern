import ProductCard from "./Card";
import { useState } from "react";
import Product from "../../pages/Product/Product";
import "./Content.css";
const MarketplaceListing = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="container">
      <h2 className="heading">Fresh recommendations</h2>

      <div className="grid">
        {products.map((product, index) => (
          <div key={index}>
            {selectedProduct && selectedProduct.id === product.id ? (
              <Product product={selectedProduct} />
            ) : (
              <ProductCard
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default MarketplaceListing;
