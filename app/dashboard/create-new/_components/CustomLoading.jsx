import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'

function CustomLoading({loading, status}) {
  return (
    <div>
        <AlertDialog open={loading}>
            <AlertDialogContent className='bg-white'>
                <div className='flex flex-col items-center my-10 justify-center text-center gap-4'>
                    <Image src={'/progress.gif'} width={100} height={100} alt="Generating progress"/>
                    <div className="font-semibold text-lg text-gray-800">
                      {status || "Hang On We're getting things done..."}
                    </div>
                    <p className="text-sm text-gray-400">Do not refresh or close this page</p>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  )
}

export default CustomLoading