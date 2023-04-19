import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import NavBar from './Navbar';
import Home from './Home';
import Cart from './Cart';
import { auth, database } from './firebase';
import SignInModal from './SignInModal';
import CheckoutModal from './CheckoutModal';

const App = () => {
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [cartVisible, setCartVisible] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [signInModalVisible, setSignInModalVisible] = useState(false); 
    const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            setUser(user);
          } else {
            setUser(null);
          }
        });
        return () => {
          unsubscribe();
        };
      }, []);


      useEffect(() => {
        if (user) {
          const cartItemsRef = database.ref(`users/${user.uid}/cartItems`);
          cartItemsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
              setCartItems(data);
            } else {
              setCartItems([]);
            }
          });
          return () => {
            cartItemsRef.off();
          };
        }
    }, [user]);

    const addToCart = (book) => {
        console.log("Adding to cart:", book);
        const existingItem = cartItems.find((item) => item.id === book.id);
      
        if (existingItem) {
          const updatedCartItems = cartItems.map((item) =>
            item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
          );
          setCartItems(updatedCartItems);
          database.ref(`users/${user.uid}/cartItems`).set(updatedCartItems);
        } else {
          const newCartItems = [...cartItems, { ...book, quantity: 1 }];
          setCartItems(newCartItems);
          database.ref(`users/${user.uid}/cartItems`).set(newCartItems);
        }
      };

      const handleDecreaseQuantity = (id) => {
        const updatedCartItems = cartItems
          .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
          .filter((item) => item.quantity > 0);
    
        setCartItems(updatedCartItems);
        database.ref(`users/${user.uid}/cartItems`).set(updatedCartItems);
      };
    
      const handleSignIn = (signedInUser) => {
        setUser(signedInUser);
      };
    
      const handleSignOut = () => {
        setUser(null);
      };
      const toggleCartVisibility = () => {
        setCartVisible(!cartVisible);
      };
      const handleToggleCart = () => {
        setCartVisible(!cartVisible);
      };
      const handleAddToCart = (book) => {
        console.log("Handling add to cart:", book);
        if (user) {
          addToCart(book);
          setCartVisible(true);
        } else {
          showSignInModal(); // Show the sign-in modal if the user is not logged in
        }
      };
      
      const handleIncreaseQuantity = (id) => {
        const updatedCartItems = cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCartItems);
        database.ref(`users/${user.uid}/cartItems`).set(updatedCartItems);
      };
      const handleCheckout = () => {
        setCheckoutModalVisible(true);
      };
      
      const showSignInModal = () => {
        setSignInModalVisible(true);
      };
      
    
      return (
        <Router>
          <div className="App">
            <NavBar
              user={user}
              onSignOut={handleSignOut}
              onSearchQueryChange={setSearchQuery}
              onToggleCart={toggleCartVisibility}
            />
            <Home
              searchQuery={searchQuery}
              addToCart={handleAddToCart}
              cartItems={cartItems}
              user={user}
              showSignInModal={showSignInModal} // Pass the showSignInModal function as a prop
            />
            <Cart
              onIncreaseQuantity={handleIncreaseQuantity}
              onDecreaseQuantity={handleDecreaseQuantity}
              visible={cartVisible}
              onClose={handleToggleCart}
              cartItems={cartItems}
              onCheckout={handleCheckout}
            />
            <CheckoutModal
              isOpen={checkoutModalVisible}
              onRequestClose={() => setCheckoutModalVisible(false)}
            />
            <SignInModal
              isOpen={signInModalVisible}
              onRequestClose={() => setSignInModalVisible(false)}
            />
          </div>
        </Router>
      );
    };
    
    export default App;
    

