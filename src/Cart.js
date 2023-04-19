import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, visible, onClose, onIncreaseQuantity, onDecreaseQuantity, onCheckout }) => {
  const handleCloseClick = () => {
    if (onClose) {
      onClose();
    }
  };
  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    }
  };

  const CartItems = ({ items, onIncreaseQuantity, onDecreaseQuantity }) => {
    return (
      items.length > 0 ? (
        <div>
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.cover} alt={item.title} />
              <div className="cart-item-info">
                <h4>{item.title}</h4>
                <p>{item.author}</p>
                <p>{item.description}</p> {/* Add this line to display the description */}
                <p>{item.price} x {item.quantity} = ${(parseFloat(item.price.slice(1)) * item.quantity).toFixed(2)}</p>
              </div>
              <div className="cart-item-quantity">
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => onIncreaseQuantity(item.id)}>+</button>
                <button onClick={() => onDecreaseQuantity(item.id)}>-</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="cart-empty">Cart is empty</div>
      )
    );
  };

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + (parseFloat(item.price.slice(1)) * item.quantity);
  }, 0);

  const tax = 0.1 * subtotal;
  const shipping = 5.0;
  const total = subtotal + tax + shipping;

  return (
    <div className={`cart${visible ? ' cart-visible' : ''}`}>
      <div className="cart-nav">
        <button className="close-cart" onClick={handleCloseClick}>
          Close
        </button>
      </div>
      <h2 className="cart-title">Shopping Cart</h2>
      <CartItems
        items={cartItems}
        onIncreaseQuantity={onIncreaseQuantity}
        onDecreaseQuantity={onDecreaseQuantity}
      />
      <div className="cart-summary">
        <p>Subtotal: ${(subtotal).toFixed(2)}</p>
        <p>Tax: ${(tax).toFixed(2)}</p>
        <p>Shipping: ${(shipping).toFixed(2)}</p>
        <p>Total: ${(total).toFixed(2)}</p>
        <button className="checkout-button" onClick={handleCheckout} disabled={cartItems.length === 0}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
