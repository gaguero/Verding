import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './RegisterPage.module.css';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../stores/authStore';
import { registerUser } from '../services/authService';

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      const { token, user } = await registerUser({ firstName, lastName, email, password });
      login(token, user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Create your Verding Account</h1>
          <p>Start managing your microgreens with ease</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.group}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="Enter your first name"
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Enter your last name"
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a password"
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
          </div>

          <Button type="submit" variant="primary" size="medium">
            Create Account
          </Button>
        </form>

        <div className={styles.footer}>
          <p>Already have an account? <Link to="/login" className={styles.link}>Sign in</Link></p>
        </div>
      </div>
    </div>
  );
} 