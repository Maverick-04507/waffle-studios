"use client"
import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Volume2, VolumeX, ArrowLeft, Download } from 'lucide-react'

export default function VideoPlayer({ videoData, onBack }) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  
  const audioRef = useRef(null)
  const timerRef = useRef(null)

  const scenes = videoData?.scenes || []
  const currentScene = scenes[currentSceneIndex]

  // Track the audio and switch scenes when ended
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.load()
      
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error("Audio playback error:", err)
          setIsPlaying(false)
        })
      }
    }
  }, [currentSceneIndex])

  // Handle Play/Pause toggle
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    } else {
      audioRef.current?.play().then(() => {
        setIsPlaying(true)
      }).catch(err => {
        console.error("Audio playback error:", err)
      })
    }
  }

  // Handle audio ending -> go to next scene
  const handleAudioEnded = () => {
    if (currentSceneIndex < scenes.length - 1) {
      setCurrentSceneIndex(prev => prev + 1)
    } else {
      // Loop or stop
      setIsPlaying(false)
      setCurrentSceneIndex(0)
    }
  }

  // Update progress bar
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime
      const duration = audioRef.current.duration || 1
      
      // Calculate overall progress across all scenes
      const sceneProgress = current / duration
      const totalProgress = ((currentSceneIndex + sceneProgress) / scenes.length) * 100
      setProgress(totalProgress)
    }
  }

  const restartVideo = () => {
    setIsPlaying(false)
    setCurrentSceneIndex(0)
    setProgress(0)
    if (audioRef.current) {
      audioRef.current.currentTime = 0
    }
    setTimeout(() => {
      togglePlay()
    }, 100)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8">
      {/* Back button */}
      <button 
        onClick={onBack}
        className="self-start flex items-center gap-2 mb-6 text-gray-500 hover:text-gray-900 transition-all font-medium text-sm cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to creation
      </button>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row items-center gap-8 w-full max-w-4xl">
        
        {/* Left Side: Dynamic vertical phone frame */}
        <div className="relative w-[340px] h-[600px] bg-black rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-900 flex flex-col justify-between shrink-0">
          
          {/* Active scene image view with smooth transitions */}
          {currentScene && (
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={currentScene.imageUrl}
                alt={currentScene.imagePrompt}
                className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                  isPlaying ? 'scale-110 translate-y-2' : 'scale-100 translate-y-0'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35" />
            </div>
          )}

          {/* Audio player element */}
          {currentScene && (
            <audio
              ref={audioRef}
              src={currentScene.audioUrl}
              onEnded={handleAudioEnded}
              onTimeUpdate={handleTimeUpdate}
              muted={isMuted}
            />
          )}

          {/* Subtitles Overlay */}
          <div className="absolute inset-x-0 bottom-24 flex items-center justify-center p-6 z-10">
            <div className="bg-black/75 backdrop-blur-sm border border-white/10 text-white font-bold text-center px-4 py-3 rounded-2xl shadow-lg leading-relaxed text-sm max-w-[90%]">
              {currentScene?.ContentText}
            </div>
          </div>

          {/* Media Controls inside phone layout */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-3 z-10">
            {/* Seek Bar */}
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-100 ease-out" 
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Panel Buttons */}
            <div className="flex items-center justify-between text-white px-2">
              <div className="text-xs font-semibold select-none bg-black/40 px-2.5 py-1 rounded-full">
                Scene {currentSceneIndex + 1} of {scenes.length}
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={restartVideo}
                  className="hover:text-primary transition-colors cursor-pointer"
                  title="Restart"
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
                <button 
                  onClick={togglePlay}
                  className="bg-primary text-white p-2.5 rounded-full hover:scale-105 transition-all shadow-md cursor-pointer"
                >
                  {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
                </button>
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-primary transition-colors cursor-pointer"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="h-5 w-5 text-red-500" /> : <Volume2 className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Details & Assets List */}
        <div className="flex-1 flex flex-col justify-start w-full self-start">
          <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Short Video Preview</h2>
            <p className="text-sm text-gray-500 mb-6">
              Review and listen to the AI-generated scenes, visual styles, and synthesized narration before export.
            </p>

            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Scenes Breakdown</h3>
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
              {scenes.map((scene, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    setCurrentSceneIndex(idx)
                    setIsPlaying(true)
                  }}
                  className={`flex gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    currentSceneIndex === idx 
                      ? 'border-primary bg-primary/5 shadow-sm' 
                      : 'border-gray-100 hover:bg-gray-50 hover:border-gray-200'
                  }`}
                >
                  <img
                    src={scene.imageUrl}
                    className="w-16 h-20 object-cover rounded-lg shrink-0"
                    alt={`Thumb ${idx + 1}`}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <p className="text-xs text-gray-400 font-semibold uppercase">Scene {idx + 1}</p>
                    <p className="text-xs text-gray-800 line-clamp-2 mt-1 italic">
                      "{scene.ContentText}"
                    </p>
                    <p className="text-[10px] text-primary font-medium mt-1 truncate">
                      Style prompt: {scene.imagePrompt}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Asset download options */}
            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <a
                href={currentScene?.imageUrl}
                download={`scene-${currentSceneIndex + 1}.jpg`}
                className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-xl cursor-pointer transition-all"
              >
                <Download className="h-4 w-4" />
                Save Current Visual
              </a>
              <a
                href={currentScene?.audioUrl}
                download={`voice-${currentSceneIndex + 1}.mp3`}
                className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-xl cursor-pointer transition-all"
              >
                <Download className="h-4 w-4" />
                Save Current Audio
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
