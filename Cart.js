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
              <div className="cart-item-info"></div>
              <h4>{item.title}</h4>
                <p>{item.author}</p>
                <p>{item.description}</p> {/* Add this line to display the description */}
                <p>{item.price} x {item.quantity} = ${(parseFloat(item.price.slice(1)) * item.quantity).toFixed(2)}</p>
              </div>
