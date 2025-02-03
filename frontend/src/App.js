import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/Layouts/ProtectedRoute';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import TransactionPage from './components/page/TransactionPage';
import Dashboard from './components/page/Dashboard';
import About from './pages/About';
import BlogPage from './pages/BlogPage';
import Featur from './components/Layouts/Featur';
import How from './components/Layouts/How';
import Tc from './pages/Tc';
import Policy from './pages/Policy';

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Landing page route */}
        <Route
          path="/"
          element={
            <HomePage />
          }
        />
        <Route path="/about" element={<About/>} />
        <Route path="/blogpage" element={<BlogPage/>} />
        <Route path="/featur" element={<Featur/>} />
        <Route path="/how" element={<How/>} />
        <Route path="/tc" element={<Tc/>} />
        <Route path="/policy" element={<Policy/>} />

        

         {/* Protected route */}
         <Route
          path="/userpage"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
          />

          {/* User route */}
          <Route
          path="/transactionpage" 
          element={<TransactionPage />
          }
          />
          <Route
          path="/dashboard" element={<Dashboard/>}
          />
          <Route path="/" element={<Dashboard />} />
          

      </Routes>
    </>
  );
}

export default App;
