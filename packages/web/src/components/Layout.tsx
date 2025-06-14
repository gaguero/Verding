import { Button } from '../components/ui/Button';
import { useAuthStore } from '../stores/authStore';
import styles from './Layout.module.css';
import React, { useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';

export function Layout() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.logo}>Verding</h1>
          <nav className={styles.nav}>
            <Link to='/' className={styles.navLink}>
              Home
            </Link>
            <Link to='/dashboard' className={styles.navLink}>
              Dashboard
            </Link>
            <Button onClick={handleLogout} variant='secondary' size='small'>
              Logout
            </Button>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className='container'>
          <Outlet />
        </div>
      </main>

      <footer className='footer'>
        <div className='container'>
          <p>&copy; 2024 Verding. Agent-First Microgreens Management.</p>
        </div>
      </footer>
    </>
  );
}
