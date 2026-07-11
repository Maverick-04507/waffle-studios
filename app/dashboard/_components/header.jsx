"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Key, ShieldAlert } from 'lucide-react'
import ApiKeysModal from '@/components/ApiKeysModal'
import Link from 'next/link'

function Header() {
  const [modalOpen, setModalOpen] = useState(false)
  const [keysConfigured, setKeysConfigured] = useState(true)

  const checkKeys = () => {
    if (typeof window !== 'undefined') {
      const gemini = localStorage.getItem('waffle_gemini_key')
      const openai = localStorage.getItem('waffle_openai_key')
      const claude = localStorage.getItem('waffle_claude_key')
      setKeysConfigured(!!(gemini || openai || claude))
    }
  }

  useEffect(() => {
    checkKeys()
    const handleStorageChange = () => checkKeys()
    window.addEventListener('storage', handleStorageChange)
    // Custom event to trigger re-checks on the same page
    window.addEventListener('keysUpdated', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('keysUpdated', handleStorageChange)
    }
  }, [])

  return (
    <div className='p-3 px-5 flex items-center justify-between shadow-md bg-white border-b border-gray-100'>
        <Link href="/dashboard" className='flex gap-3 items-center cursor-pointer'>
          <Image src={'/logo.png'} width={50} height={50} alt="Waffle Studio Logo"/>
          <h2 className='font-bold text-xl'>Waffle Studio</h2>
        </Link>
        <div className='flex gap-4 items-center'>
            <button 
              onClick={() => setModalOpen(true)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                keysConfigured 
                  ? 'border-gray-200 text-gray-700 hover:bg-gray-50' 
                  : 'border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              {keysConfigured ? (
                <>
                  <Key className="h-4 w-4 text-primary" />
                  <span>API Keys</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="h-4 w-4 text-amber-600 animate-pulse" />
                  <span>Configure Keys</span>
                </>
              )}
            </button>
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <UserButton/>
        </div>

        <ApiKeysModal 
          isOpen={modalOpen} 
          onClose={() => {
            setModalOpen(false)
            checkKeys()
            // Dispatch event to sync other client components
            window.dispatchEvent(new Event('keysUpdated'))
          }} 
        />
    </div>
  )
}

export default Header