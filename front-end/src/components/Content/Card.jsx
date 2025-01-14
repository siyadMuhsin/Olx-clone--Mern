import "./Card.css";
import { Link, Route, useNavigate } from "react-router-dom";

export const timeHandle = (time) => {
  let seconds = Math.floor(time / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let months = Math.floor(days / 30);
  let years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} yr${years > 1 ? "s" : ""} ago`;
  }
  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  if (hours > 0) {
    return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  }
  if (minutes > 0) {
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  }
  return `${seconds} sec ago`;
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/product", { state: { product } });
  };

  return (
    <div onClick={handleNavigate} className="product-card cursor-pointer">
      <div className="image-container">
        <img
          className="product-image"
          src={product.image || "/api/placeholder/400/300"}
          alt={product.productName}
        />
      </div>

      <div className="product-info">
        <div className="product-price">₹ {product.price.toLocaleString()}</div>

        {product.description && (
          <p className="product-description">{product.description}</p>
        )}

        <h4 className="product-name">{product.productName}</h4>

        <div className="location-date">
          <span>{product.address}</span>
          {/* Replace timeHandle with a valid function */}
          <span>{product.date}</span>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
