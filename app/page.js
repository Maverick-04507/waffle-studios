"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'
import { Sparkles, AudioLines, Video, Download, ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react'

export default function Home() {
  const { isSignedIn, user } = useUser()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" width={42} height={42} alt="Waffle Studio Logo" />
          <h1 className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            Waffle Studio
          </h1>
        </div>

        <nav className="flex items-center gap-6">
          {!isSignedIn ? (
            <>
              <Link 
                href="/sign-in"
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up"
                className="bg-primary hover:bg-primary/95 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all hover:scale-[1.02]"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link 
                href="/dashboard"
                className="text-sm font-semibold text-primary hover:underline transition-all"
              >
                Go to Dashboard
              </Link>
              <div className="flex items-center gap-2 border-l border-gray-100 pl-4">
                <UserButton />
              </div>
            </>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-20 max-w-5xl mx-auto overflow-hidden">
        {/* Soft Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
        
        {/* Interactive Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
          <Sparkles className="h-3.5 w-3.5" />
          Multi-Model AI Video Generator
        </div>

        {/* Hero Title */}
        <h2 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 max-w-4xl leading-tight">
          Create Stunning AI Video Shorts <br />
          <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            In Just Seconds
          </span>
        </h2>

        {/* Hero Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed">
          Transform your raw ideas into engaging, voiceover-synchronized vertical shorts. Complete with subtitle overlays, panning scene visuals, and instant local downloads.
        </p>

        {/* Hero Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 bg-primary hover:bg-primary/95 text-white text-base font-bold px-8 py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-primary/30"
          >
            <span>Start Generating Free</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <a 
            href="#features" 
            className="border border-gray-200 hover:bg-gray-100 text-gray-700 text-base font-semibold px-8 py-4 rounded-2xl transition-all"
          >
            Explore Features
          </a>
        </div>

        {/* Video Mockup Visual */}
        <div className="mt-20 relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white/40 backdrop-blur-md p-2">
          <div className="bg-gray-950 aspect-video rounded-2xl relative overflow-hidden group">
            <video 
              className="absolute inset-0 w-full h-full object-cover" 
              src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4"
              autoPlay 
              loop 
              muted 
              playsInline
            />
            {/* Dark overlay with player info that fades on hover */}
            <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center p-6 text-center group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
              <div className="rounded-2xl bg-white/10 backdrop-blur-md p-4 text-white">
                <Video className="h-10 w-10 text-indigo-400 animate-pulse" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">Waffle Studio Player</h3>
              <p className="text-xs text-gray-300 max-w-xs mt-1">Select topic prompts, styles, and generate. Click "Start Generating Free" to build your own.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">How Waffle Studio Works</h2>
            <p className="mt-4 text-gray-500 max-w-md mx-auto">Create and iterate on vertical formats in a seamless end-to-end timeline</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all bg-gray-50">
              <div className="bg-primary/10 text-primary p-3.5 rounded-xl w-fit mb-5">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">AI Scripting</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Advanced AI models (Gemini, ChatGPT, or Claude) craft custom, cohesive script scenes complete with image style prompts and narrator voiceover texts.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all bg-gray-50">
              <div className="bg-indigo-100 text-indigo-600 p-3.5 rounded-xl w-fit mb-5">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Breathtaking Visuals</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Advanced image models (Imagen 3 or DALL-E 3) generate 9:16 aspect ratio scene artwork corresponding to your designated topic and creative art styles.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all bg-gray-50">
              <div className="bg-emerald-100 text-emerald-600 p-3.5 rounded-xl w-fit mb-5">
                <AudioLines className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Realistic Voiceover</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Google Cloud Text-to-Speech synthesizes warm, organic narrator voices perfectly matched with your script length.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all bg-gray-50">
              <div className="bg-amber-100 text-amber-600 p-3.5 rounded-xl w-fit mb-5">
                <Download className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Local Downloads</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Export and save scene assets, voice tracks, or view them dynamically inside the custom vertical player frame.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Client-Side Focus Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex bg-white/10 p-3 rounded-full mb-6">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Your Keys. Your Privacy.</h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
            Unlike other platforms, Waffle Studio never stores your secret API credentials on our servers. Your AI and Text-to-Speech keys are kept exclusively inside your browser local storage.
          </p>
          <div className="flex justify-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-primary" /> Encrypted browser headers</span>
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-primary" /> Direct official APIs</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-10 px-6 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} Waffle Studio. All rights reserved.</p>
      </footer>

    </div>
  )
}
