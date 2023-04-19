import React from 'react';
import './Home.css';

const booksData = [
  {
    id: 1,
    title: 'Book1',
    author: 'Author 1',
    price: '$9.99',
    cover: '/assets/book1.jpg'
  },
  {
    id: 2,
    title: 'Book2',
    author: 'Author 2',
    price: '$12.99',
    cover: '/assets/book9.jpg'
  },
  {
    id: 3,
    title: 'Book3',
    author: 'Author 1',
    price: '$9.99',
    cover: '/assets/book3.jpg'
  },
  {
    id: 4,
    title: 'Book4',
    author: 'Author 2',
    price: '$12.99',
    cover: '/assets/book4.jpg'
  },
  {
    id: 5,
    title: 'Book5',
    author: 'Author 1',
    price: '$9.99',
    cover: '/assets/book5.jpg'
  },
  {
    id: 6,
    title: 'Book6',
    author: 'Author 2',
    price: '$12.99',
    cover: '/assets/book6.jpg'
  },
  {
    id: 7,
    title: 'Book7',
    author: 'Author 1',
    price: '$9.99',
    cover: '/assets/book7.jpg'
  },
  {
    id: 8,
    title: 'Book8',
    author: 'Author 2',
    price: '$12.99',
    cover: '/assets/book8.jpg'
  }
];

const BookCard = ({ book, addToCart, user, showSignInModal }) => {
    const handleAddToCartClick = () => {
      if (user) {
        addToCart(book);
      } else {
        showSignInModal();
      }
    };
    return (
        <div className="book-card">
          <img src={book.cover} alt={book.title} width="100" height="150" />
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p className="price">{book.price}</p>
          <button onClick={handleAddToCartClick}>Add to Cart</button>
        </div>
      );
    };

    const Footer = () => {
        return (
          <footer className="footer">
            <p>&copy; 2023 All rights reserved.</p>
          </footer>
        );
      };
      
