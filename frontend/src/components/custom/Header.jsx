import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { useUser,UserButton } from '@clerk/clerk-react'
function Header() {
  const {user,isSignedIn}=useUser();
  return (
    <div style = {{padding:'1rem 1rem', display:'flex', justifyContent:'space-between',boxShadow:'2px 2px 10px rgb(0,0,0,0.1'}}>
        <img src = '/logo.svg' width={100} height={50}/>

        {isSignedIn?
        <div style={{display:'flex',gap:2,alignItems:'center'}}>
          <Link to={'/dashboard'}>
          <Button>Dashboard</Button>
          </Link>
        <UserButton/>
        </div>:
        
        <Link to={'/auth/sign-in'}>
        <Button style = {{backgroundColor:'#9f5bff',color:'white'}}>Get Started</Button>
        </Link>
     }
    </div>
  )
}

export default Header