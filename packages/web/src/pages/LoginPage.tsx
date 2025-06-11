import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { useAuthStore } from '../stores/authStore';
import { loginUser } from '../services/authService';
import { Button } from '../components/ui/Button';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { token, user } = await loginUser({ email, password });
      login(token, user);
      navigate('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during login.');
      }
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Welcome to Verding</h1>
          <p>Sign in to your microgreens management platform</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
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
              placeholder="Enter your password"
            />
          </div>

          <Button type="submit" variant="primary" size="medium">
            Sign In
          </Button>
        </form>

        <div className={styles.footer}>
          <p>Don't have an account? <Link to="/register" className={styles.link}>Sign up</Link></p>
          <p><Link to="/forgot-password" className={styles.link}>Forgot your password?</Link></p>
        </div>

        <div className={styles.oauthSection}>
          <div className={styles.divider}>
            <span>Or continue with</span>
          </div>
          
          <div className={styles.oauthButtons}>
            <Button variant="ghost" size="medium">
              <span>🔗</span> Google
            </Button>
            <Button variant="ghost" size="medium">
              <span>🔗</span> GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
