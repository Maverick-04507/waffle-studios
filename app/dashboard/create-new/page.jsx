"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/selectTopic'
import SelectStyle from './_components/SelectStyle'
import Duration from './_components/selectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';

function CreateNew() {

  const [formData,setFormData]=useState([]);

  const onHandleInputChange=(fieldName,fieldValue)=>{
    console.log(fieldName,fieldValue)

    setFormData(prev=>({
      ...prev,
      [fieldName]:fieldValue
    }))
  }

  const getVideoScript= async ()=>{
      const prompt = "Write a script to generate "+formData.duration+" video on topic: "+formData.topic+" along with AI image prompt in " +formData.imageStyle+ " format for each scene and give me result in JSON format with imagePrompt and ContentText as field"
      console.log(prompt)
      const result = await axios.post('/api/get-video-script',{
        prompt:prompt
      }).then(resp=>{
        console.log(resp.data)
      })
  }

  const onCreateClickHandler=()=>{
    getVideoScript();
  }

  return (
   <div className='md:px-20'>
    <h2 className='font-bold text-4xl text-primary'>

    </h2>
    <div className='mt-10 shadow-md'>
      <SelectTopic onUserSelect={onHandleInputChange}/>

      <SelectStyle onUserSelect={onHandleInputChange}/>

      <Duration onUserSelect={onHandleInputChange}/>
      
      <Button className='mt-10 w-full' onClick={onCreateClickHandler}>Create New Video</Button>
    </div>
   </div>
  )
}

export default CreateNew