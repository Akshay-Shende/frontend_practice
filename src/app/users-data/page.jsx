"use client"
import useAuth from '@/appwriteServices/auth'
import { useEffect } from 'react'

const Page = () => {
  const {allUsers} = useAuth();
  useEffect(async()=>{
console.log( "testing log");
 const resultData = await allUsers();

 console.log(resultData);
  },[])
  return (
    <div>
      
    </div>
  )
}

export default Page
