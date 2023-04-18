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


    
  

}