"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import { syncUserToDatabase } from '@/app/actions/user'; 
function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const userData = {
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        imageUrl: user.imageUrl
      };
      
      syncUserToDatabase(userData);
    }
  }, [user]);

  return (
    <div>
      {children}
    </div>
  );
}

export default Provider;