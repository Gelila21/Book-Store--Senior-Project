import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, visible, onClose, onIncreaseQuantity, onDecreaseQuantity, onCheckout }) => {
  const handleCloseClick = () => {
    if (onClose) {
      onClose();
    }
  };
