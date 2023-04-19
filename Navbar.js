import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import { auth } from "./firebase";
import { AiOutlineShoppingCart } from 'react-icons/ai';