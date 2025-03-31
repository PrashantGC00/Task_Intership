import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Button from '@mui/material/Button'

const NavigationBar = () => {

  const handleClick = async() => {
    try{
      const response = await fetch("http://localhost:5000/api/Identity/get-token",{
        method: "GET",
      })
      const result = await response.json()
      if(!response.ok){
        toast.error(result.message || "Something went wrong")
        return
      }
      localStorage.setItem("token", result.token)
      toast.success(result.message)
    }catch(err){
      toast.error("Something went wrong")
    }

  }

  return (
    <div className='w-[100%] h-[8vh] bg-secondary-color flex z-10 fixed top-0 px-10 items-center' 
         style={{
           boxShadow: "rgba(0, 0, 0, 0.23) 0px 4px 6px, rgba(0, 0, 0, 0.19) 0px 4px 10px"
         }}>
          <div>
            <Button variant='outlined' onClick={handleClick}>Get Token</Button>
          </div>
          <Toaster />
    </div>
  )
}

export default NavigationBar
