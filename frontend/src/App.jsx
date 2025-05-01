
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button} from './components/ui/button'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header'
// import { Outlet } from "react-router-dom"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import ResumeDetails from './pages/ResumeDetails.jsx';
import SavedResumes from './pages/SavedResumes.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  const [count, setCount] = useState(0)
   const {user,isLoaded,isSignedIn}=useUser();

   if(!isSignedIn && isLoaded){
    return <Navigate to={"/auth/sign-in"}/>
   }
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {/* Your routes go here */}
        </main>
      </div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-resume" element={<CreateResume />} />
      <Route path="/saved-resumes" element={<SavedResumes />} />
      <Route path="/resume/:id" element={<ResumeDetails />} />
      <Route path="/edit-resume/:id" element={<EditResume />} />
    </Routes>
  </Router>
  );
}

export default App
