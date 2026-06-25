"use client"
import Image from 'next/image'
import React, { useState } from 'react'

function SelectStyle({onUserSelect}) {
  const styleOptions = [
    {
      name:'Realistic',
      image:"/realistic.png"
    },
    {
      name:'Cartoon',
      image:"/cartoon.png"
    },
    {
      name:'Water Color',
      image:"/watercolor.jpg"
    },
    {
      name:'GTA',
      image:"/gta.jpg"
    },
    {
      name:'Comic',
      image:"/comic.png"
    },
  ]

  const [selectedOptions,setSelectedOptions]=useState();


  return (
    <div className='mt-7'>
        <h2 className='font-bold text-2xl text-primary'>Style</h2>
        <p className='text-gray-500'>Choose your video Style</p>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-3 '>
          {styleOptions.map((item,index)=>(
            <div className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl
            ${selectedOptions==item.name &&'border-4 border-primary'}`}>
              <Image src={item.image} width={100} height={100}
              className='h-48 object-cover rounded-lg w-full '
              onClick={()=>{
                setSelectedOptions(item.name)
                onUserSelect('imageStyle',item.name)
              }}
              ></Image>
              <h2 className='absolute p-1 bg-black text-white text-center bottom-0 w-full rounded-b-lg'>
                {item.name}
              </h2>

            </div>
          ))}
        </div>
    </div>
  )
}

export default SelectStyle