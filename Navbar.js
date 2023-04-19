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

      const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const openSignUpModal = () => {
    setSignUpModalVisible(true);
    setDropdownVisible(false);
  };

  const closeSignUpModal = () => {
    setSignUpModalVisible(false);
  };

  const openSignInModal = () => {
    setSignInModalVisible(true);
    setDropdownVisible(false);
  };

  const closeSignInModal = () => {
    setSignInModalVisible(false);
  };

  const handleSignOut = () => {
    auth.signOut();
    setDropdownVisible(false);
  };

  const handleUserSignUp = (updatedUser) => {
    setCurrentUser(updatedUser);
    setSignUpModalVisible(false);
  };

  const handleUserSignIn = (userData) => {
    setCurrentUser(userData);
    setSignInModalVisible(false);
  };
  const handleCartClick = () => {
    if (onToggleCart) {
      onToggleCart();
    }
  };
  const renderInitials = () => {
    if (currentUser) {
      return currentUser.displayName
        ? currentUser.displayName.charAt(0).toUpperCase()
        : currentUser.email.charAt(0).toUpperCase();
    }
  };
  return (
    <nav className="navbar">
      <ul className="nav-items">
        <li>
          <Link to="/">
          <div className="logo-container">
            <img src={"./logo.png"} alt="Logo" className="logo" />
          </div>
          </Link>
        </li>
        <li>
          <Link to="#" onClick={handleCartClick}>
            <div className="logo-cart-container">
              <AiOutlineShoppingCart size={30} />
            </div>
          </Link>
        </li>

      </ul>
      <div className="search-bar">
        <input
          type="text"
          className="search-bar"
          placeholder="Search books..."
          onChange={handleSearchChange}
        />
        
      </div>

      <div className="profile-icon" onClick={toggleDropdown}>
        {currentUser ? (
          <>
            <FaUserCircle size={30} className={`desktop-icon${isMobile ? ' hidden' : ''}`} />
            <span className={`mobile-initials${!isMobile ? ' hidden' : ''}`}>{renderInitials()}</span>
          </>
        ) : (
          <FaUserCircle size={30} />
        )}
 {currentUser && (
        <span className={`user-name${isMobile ? ' mobile-initials' : ''}`}>
          {currentUser.displayName
            ? currentUser.displayName.charAt(0).toUpperCase() + currentUser.displayName.slice(1)
            : currentUser.email.charAt(0).toUpperCase() + currentUser.email.split("@")[0].slice(1)}
        </span>
      )}

        {dropdownVisible && (
          <ul className="dropdown-menu">
            {currentUser ? (
              <li>
                <Link to="#" onClick={handleSignOut}>
                  Logout
                </Link>
              </li>
              ) : (
                  <>
              <li>
                  <Link to="#" onClick={openSignInModal}>
                  Sign In
                  </Link>
              </li>
              <li>
                  <Link to="#" onClick={openSignUpModal}>
                  Sign Up
                  </Link>
              </li>
                  </>
            )}
            </ul>
            )}
            </div>
            <SignUpModal isOpen={signUpModalVisible} onRequestClose={closeSignUpModal} onUserSignUp={(updatedUser) => handleUserSignUp(updatedUser)}/>
            <SignInModal isOpen={signInModalVisible} onRequestClose={closeSignInModal} onUserSignIn={handleUserSignIn} />
            </nav>
             ); 
            };
export default Navbar;
