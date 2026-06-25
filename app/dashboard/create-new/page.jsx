"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/selectTopic'
import SelectStyle from './_components/SelectStyle'

function CreateNew() {

  const [formData,setFormData]=useState([]);

  const onHandleInputChange=(fieldName,fieldValue)=>{
    console.log(fieldName,fieldValue)
  }


  return (
   <div className='md:px-20'>
    <h2 className='font-bold text-4xl text-primary'>

    </h2>
    <div className='mt-10 shadow-md'>
      <SelectTopic onUserSelect={onHandleInputChange}/>

      <SelectStyle/>


      








    </div>
   </div>
  )
}

export default CreateNew