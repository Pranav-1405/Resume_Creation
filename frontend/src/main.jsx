import React from 'react';  
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import './index.css';
import App from './App.jsx';
import SignInPage from './pages/Signup.jsx';
import Login from "./pages/Login.jsx";
import Home from './home/index.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { ClerkProvider } from '@clerk/clerk-react';

import CreateResume from "./pages/CreateResume.jsx";
import SavedResumes from "./pages/SavedResumes.jsx";
import ResumeDetails from './pages/ResumeDetails.jsx';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import EditResume from './pages/EditResume.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResumeTemplate from "./pages/ResumeTemplate.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

// Define router
const router = createBrowserRouter([
  {
    element: <App />,
    
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/signin',
    element: <SignInPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path : '/create-resume',
    element: <CreateResume />,
  },
  {
    path: '/saved-resumes',
    element : <SavedResumes />,
  },
  {
    path: '/resume/:id',
    element: <ResumeTemplate/>,
  },
  {
    path: '/resume/:id/edit',
    element: <EditResume/>,
  }
]);


const root = createRoot(document.getElementById('root'));  
root.render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
    <ToastContainer 
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick
        theme="colored"
      />
    </ClerkProvider>
  </StrictMode>
);
