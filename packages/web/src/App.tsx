import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='app'>
      <Routes>
        {/* Public routes */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        {/* Protected routes with layout */}
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='dashboard' element={<DashboardPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
