import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Left Pane - Brand Info Showcase */}
      <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-gray-900 via-indigo-950 to-primary p-12 text-white relative overflow-hidden">
        {/* Decorative Grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 -z-10" />
        
        {/* Top Header */}
        <div className="flex items-center gap-3">
          <Image src="/logo.png" width={40} height={40} alt="Waffle Studio Logo" />
          <span className="font-extrabold text-xl tracking-wider">Waffle Studio</span>
        </div>

        {/* Center Tagline */}
        <div className="my-auto space-y-6 max-w-md">
          <h1 className="text-4xl font-black leading-tight tracking-tight">
            Generate Stunning AI Video Shorts in Seconds.
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed">
            Unleash your creativity. Build engaging video templates, customize image styles, write dynamic narration, and preview them with synchronized voiceovers instantly.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="bg-white/10 p-2 rounded-lg mt-0.5 select-none">
                🪄
              </div>
              <div>
                <h4 className="font-bold text-sm">Multi-Model AI Scripting</h4>
                <p className="text-xs text-gray-400">Contextual story outline and scene prompt generation.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white/10 p-2 rounded-lg mt-0.5 select-none">
                🎨
              </div>
              <div>
                <h4 className="font-bold text-sm">AI Image Generation</h4>
                <p className="text-xs text-gray-400">Vertical art canvases aligned with scene prompts.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white/10 p-2 rounded-lg mt-0.5 select-none">
                🎙️
              </div>
              <div>
                <h4 className="font-bold text-sm">Text to Speech</h4>
                <p className="text-xs text-gray-400">Warm and natural voice synthesizer audio.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-gray-400">
          AI Powered & Google Cloud APIs.
        </div>
      </div>

      {/* Right Pane - Clerk Card Form */}
      <div className="flex items-center justify-center p-8 bg-gray-50">
        <SignUp />
      </div>
    </div>
  )
}