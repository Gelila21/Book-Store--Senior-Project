import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import { auth } from "./firebase";
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Navbar = ({
    user,
    onSignOut,
    onSignIn,
    onSearchQueryChange,
    onToggleCart,
  }) => {
  
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [signUpModalVisible, setSignUpModalVisible] = useState(false);
    const [signInModalVisible, setSignInModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
  
    const handleSearchInputChange = (e) => {
      setSearchQuery(e.target.value);
    };
    const handleSearchChange = (e) => {
        if (onSearchQueryChange) {
          onSearchQueryChange(e.target.value);
        }
      };
      
      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setCurrentUser(user);
        });
    
        return () => {
          unsubscribe();
        };
      }, []);