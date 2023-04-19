import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { auth } from './firebase';

const SignInModal = ({ isOpen, onRequestClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null); // Add message state

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      onRequestClose(user);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      setMessage('Password reset link sent. Please check your inbox.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      if (error.code === 'auth/invalid-email'){
        setMessage('Please enter a valid email address'); 
      }
      if (error.code === 'auth/missing-email'){
        setMessage('Please enter a valid email address'); 
      }
      if (error.code === 'auth/user-not-found') {
        setMessage('User not registered.'); 
      } else {
        setMessage('An error occurred. Please try again.'); 
      }
    }
  };

  return (
    <Dialog open={isOpen} onClose={onRequestClose}>
      <DialogTitle>Sign In</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {message && <p style={{ color: 'red' }}>{message}</p>} {/* Display message */}
          <TextField
            autoFocus
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
          <Button onClick={handleForgotPassword} color="primary" style={{ backgroundColor: '#f2f0f0', color: '#333' }}>
            Forgot Password?
          </Button>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" style={{ backgroundColor: '#333', color: '#fff' }}>
            Sign In
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SignInModal;

