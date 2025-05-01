import { Loader2, PlusSquare } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {v4 as uuidv4} from 'uuid';
import GlobalApi from './../../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react'
function AddResume() {

  const [openDialog,setOpenDialog] = useState(false)
  const [resumeTitle,setResumeTitle]= useState();
  const {user} = useUser();
  const [loading,setLoading] = useState(false);

  const onCreate=async () =>{
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data:{
        title : resumeTitle,
        resumeId : uuid,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        userName:user?.fullName 
      }
     
    }
    // console.log(resumeTitle,uuid);
    GlobalApi.CreateNewResume(data).then(resp => {
      console.log(resp);
      if(resp){
        setLoading(false);
      }
      
    },(error) => {
      setLoading(false);
    })
  }
  return (
    <div>
        <div className="p-5 py-6 border d-flex align-items-center justify-content-center bg-secondary rounded"
        style={{ height: '200px', transition: 'transform 0.3s ease-in-out', cursor:'pointer'}} 
     onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} 
     onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
     onClick={() =>setOpenDialog(true)}>
            <PlusSquare/>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
  
        <DialogContent
  className="position-fixed d-flex justify-content-center align-items-center bg-white p-2 shadow rounded"
  style={{
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1050, // Ensures it appears above other elements
  }}
>
  <DialogHeader>
    <DialogTitle  style={{ fontSize: '1.3rem' }}>Create New Resume</DialogTitle>
    <DialogDescription>
     <p>Add Title for a new Resume</p>
     <Input  className="my-1.5" placeholder="Full stack Resume" 
     onChange = {(e) => setResumeTitle(e.target.value)}></Input>
    </DialogDescription>
    <div className="ms-4 d-flex justify-content-end gap-5">
      <Button onClick = {  () => setOpenDialog(false)} variant="ghost" >Cancel</Button>
      <Button 
       disabled = {!resumeTitle || loading}
      onClick = { () => onCreate() }>
        {loading?
        <Loader2 className='animate-spin' /> : 'create'
        }
          </Button>
    </div>
  </DialogHeader>
</DialogContent>
      
</Dialog>

    </div>
  )
}

export default AddResume