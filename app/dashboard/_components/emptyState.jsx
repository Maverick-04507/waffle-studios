import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function EmptyState() {
  return (
    <div className='p-5 py-24 flex items-center flex-col gap-5 mt-10 border-4 border-dotted'>
        <h2 className='text-3xl text-gray-300'>Let's start creating moments</h2>
        <Link href={'dashboard/create-new'}>
        <Button>Create Video</Button>
        </Link>

    </div>
  )
}

export default EmptyState