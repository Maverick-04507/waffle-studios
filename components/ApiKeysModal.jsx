"use client"
import React, { useState, useEffect } from 'react'
import { Key, Eye, EyeOff, ShieldAlert, Sparkles, AudioLines, BrainCircuit, Cpu } from 'lucide-react'

export default function ApiKeysModal({ isOpen, onClose }) {
  const [geminiKey, setGeminiKey] = useState('')
  const [openaiKey, setOpenaiKey] = useState('')
  const [claudeKey, setClaudeKey] = useState('')
  const [ttsKey, setTtsKey] = useState('')
  
  const [showGemini, setShowGemini] = useState(false)
  const [showOpenai, setShowOpenai] = useState(false)
  const [showClaude, setShowClaude] = useState(false)
  const [showTts, setShowTts] = useState(false)
  
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    if (isOpen) {
      setGeminiKey(localStorage.getItem('waffle_gemini_key') || '')
      setOpenaiKey(localStorage.getItem('waffle_openai_key') || '')
      setClaudeKey(localStorage.getItem('waffle_claude_key') || '')
      setTtsKey(localStorage.getItem('waffle_tts_key') || '')
      setStatusMessage('')
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSave = () => {
    localStorage.setItem('waffle_gemini_key', geminiKey.trim())
    localStorage.setItem('waffle_openai_key', openaiKey.trim())
    localStorage.setItem('waffle_claude_key', claudeKey.trim())
    localStorage.setItem('waffle_tts_key', ttsKey.trim())
    setStatusMessage('Keys saved successfully!')
    setTimeout(() => {
      onClose()
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl transition-all duration-300 dark:border-gray-800 dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-800">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <Key className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">API Keys Configuration</h3>
            <p className="text-sm text-gray-500">Provide keys for AI content and Voice generation</p>
          </div>
        </div>

        {/* Info Alert */}
        <div className="mt-5 flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
          <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed">
            These keys are stored <strong>strictly locally</strong> in your browser's local storage and are never saved to our database or sent to any third-party other than official official endpoints.
          </p>
        </div>

        {/* Inputs */}
        <div className="mt-6 space-y-5">
          {/* Gemini Key Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <Sparkles className="h-4 w-4 text-violet-500" />
              Gemini API Key (Google AI Studio)
            </label>
            <div className="relative">
              <input
                type={showGemini ? 'text' : 'password'}
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="Enter Gemini API Key (AIzaSy...)"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 pr-10 text-sm outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowGemini(!showGemini)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showGemini ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* OpenAI Key Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <BrainCircuit className="h-4 w-4 text-green-500" />
              OpenAI API Key (ChatGPT)
            </label>
            <div className="relative">
              <input
                type={showOpenai ? 'text' : 'password'}
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                placeholder="Enter OpenAI API Key (sk-...)"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 pr-10 text-sm outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowOpenai(!showOpenai)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showOpenai ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Anthropic Key Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <Cpu className="h-4 w-4 text-orange-500" />
              Anthropic API Key (Claude)
            </label>
            <div className="relative">
              <input
                type={showClaude ? 'text' : 'password'}
                value={claudeKey}
                onChange={(e) => setClaudeKey(e.target.value)}
                placeholder="Enter Anthropic API Key (sk-ant-...)"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 pr-10 text-sm outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowClaude(!showClaude)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showClaude ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* TTS Key Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <AudioLines className="h-4 w-4 text-emerald-500" />
              Google Cloud TTS API Key (Optional)
            </label>
            <div className="relative">
              <input
                type={showTts ? 'text' : 'password'}
                value={ttsKey}
                onChange={(e) => setTtsKey(e.target.value)}
                placeholder="Enter Google Cloud API Key"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 pr-10 text-sm outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowTts(!showTts)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showTts ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-[11px] text-gray-400">
              Only required if using Google Cloud TTS. Can be left blank if using Free Google Translate synthesis.
            </p>
          </div>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <p className="mt-4 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
            {statusMessage}
          </p>
        )}

        {/* Footer Actions */}
        <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-4 dark:border-gray-800">
          <button
            onClick={onClose}
            className="rounded-xl px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-md hover:bg-primary/95 transition-all"
          >
            Save Keys
          </button>
        </div>
      </div>
    </div>
  )
}
