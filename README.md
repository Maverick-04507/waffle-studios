# 🎬 Waffle Studio - AI-Powered Short Video Generator

Waffle Studio is a web application built using **Next.js (App Router)** designed to automatically generate, render, and compile short vertical video formats (9:16) using generative AI. It allows users to write scripts, synthesize natural voice narrations, generate scene visuals, and preview them inside an interactive mobile viewport player.

---

## ✨ Features

* 🤖 **Multi-Model AI Scripting**: Generate detailed scene scripts with image prompts and voiceover text using **Gemini 2.5 Flash**, **ChatGPT (GPT-4o-mini)**, or **Claude 3.5 Sonnet**.
* 🎨 **Visual Scene Builder**: Generate vertical visual artwork matching your script scenes and artistic style (Cartoon, Realistic, Watercolor, Comic, etc.) powered by Google's **Imagen 3** (`imagen-3.0-generate-002`).
* 🎙️ **Voice Narration (Free & Premium)**:
  * **Free (Google Translate)**: Generates narration voice tracks instantly **without requiring any API key** (features automatic sentence-chunking and audio buffer concatenation).
  * **Premium (Google Cloud TTS)**: High-quality organic synthesis using GCP Neural2/Wavenet voices.
* 🔒 **Zero-Server Key Privacy**: All user API keys (Gemini, OpenAI, Claude, GCP) are saved strictly inside browser `localStorage`, ensuring credentials never touch Waffle Studio databases.
* 📱 **Interactive Viewport Player**: Includes a vertical mobile player with:
  * Automatic visual transitions synchronized with audio track completion.
  * Image pan/zoom (Ken Burns) movement transitions.
  * Styled caption subtitles overlay.
  * Single-click asset downloader (saves visuals and voice files).
* 🔐 **Secure Authentication**: Fully integrated with **Clerk Auth** for signup, signin, profile sync, and route guards.
* 🗄️ **Serverless DB**: Powered by **Neon PostgreSQL** serverless client and **Drizzle ORM** for user registration and synchronization.

---

## 🛠️ Technology Stack

* **Framework**: Next.js 16.2.9 (App Router)
* **Frontend**: React 19, Tailwind CSS v4, Lucide Icons
* **Authentication**: Clerk (`@clerk/nextjs`)
* **ORM & Database**: Drizzle ORM, Neon Postgres client
* **AI Clients**: Google GenAI SDK (`@google/genai`), OpenAI Chat API, Anthropic Messages API, Google Cloud Text-to-Speech

---

## 📁 Repository Structure

```
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Clerk Auth pages (sign-in, sign-up)
│   ├── actions/                # Server actions (Database User Syncer)
│   ├── api/                    # Serverless Backend API Routes
│   │   ├── generate-audio/     # TTS synthesizer (Google TTS vs Translate API)
│   │   ├── generate-image/     # Imagen 3 Visual asset generator
│   │   └── get-video-script/   # Multiprovider AI script builder
│   ├── dashboard/              # Protected dashboard wizard routes
│   └── page.js                 # Landing Page
├── components/                 # React UI Components
│   ├── ApiKeysModal.jsx        # Settings modal to configure Local Storage keys
│   └── VideoPlayer.jsx         # 9:16 mobile frame interactive video player
├── configs/                    # API and database connector configs
│   ├── db.js                   # Drizzle database client initialization
│   ├── genAi.js                # Google Gemini generative client config
│   └── schema.js               # PostgreSQL database schema rules
├── proxy.ts                    # Next.js Clerk middleware file
├── tailwind.config.js          # Styling configurations
└── package.json                # Project dependencies
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Maverick-04507/waffle-studios.git
cd waffle-studios/a--short-video
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory `a--short-video/` and configure the following parameters:

```env
DATABASE_URL=your_neon_postgres_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🔑 AI Credentials Setup Guide

To use the generative options in Waffle Studio, save your credentials in the dashboard settings panel (API Keys button in header):

1. **Gemini API Key**: Go to [Google AI Studio](https://aistudio.google.com/) and create a free key.
2. **OpenAI API Key**: Create an API key in your [OpenAI Platform Settings](https://platform.openai.com/).
3. **Anthropic API Key**: Generate a key inside your [Anthropic Console](https://console.anthropic.com/).
4. **Google Cloud TTS (Optional)**: Enable the "Cloud Text-to-Speech API" on GCP, create an API key under Credentials, and insert it. (Can be left blank if utilizing the default Free Google Translate voice option).
