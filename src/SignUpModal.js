import React, { useState } from 'react';
import { auth, createUserProfileDocument } from './firebase';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const SignUpModal = ({ isOpen, onRequestClose, onUserSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }
  
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }
  
      try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        await user.updateProfile({
          displayName: name,
        });
        const updatedUser = { ...user, displayName: name };
        onUserSignUp(updatedUser);
      } catch (error) {
        console.error('Error signing up:', error);
      }
    };
  
    return (
      <Dialog open={isOpen} onClose={onRequestClose}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onRequestClose} color="primary" style={{backgroundColor: '#f2f0f0',color: '#333' }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained" style={{ backgroundColor: '#333', color: '#fff' }}>
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default SignUpModal;
  
