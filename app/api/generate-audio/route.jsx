import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const { text, voiceName = 'en-US-Neural2-F', provider = 'free' } = await req.json();
    const apiKey = req.headers.get('x-tts-key');

    if (!text || text.trim() === '') {
      return NextResponse.json({ Error: 'Text content is required' }, { status: 400 });
    }

    if (provider === 'gcp') {
      if (!apiKey) {
        return NextResponse.json(
          { Error: 'Google Cloud TTS API Key is required. Please configure it in settings.' },
          { status: 400 }
        );
      }

      const ttsUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

      const requestBody = {
        input: { text },
        voice: { 
          languageCode: 'en-US', 
          name: voiceName 
        },
        audioConfig: { 
          audioEncoding: 'MP3',
          speakingRate: 1.0,
          pitch: 0.0
        }
      };

      console.log(`Sending GCP TTS request for: "${text.substring(0, 30)}..."`);
      
      const response = await axios.post(ttsUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const audioContent = response.data.audioContent;
      if (!audioContent) {
        throw new Error('No audio content returned from Google TTS API');
      }

      return NextResponse.json({ audioContent });

    } else {
      // Free Google Translate provider
      console.log(`Using Free Translate TTS for: "${text.substring(0, 30)}..."`);
      
      // Split text into chunks smaller than 200 characters (Translate TTS limit)
      const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
      const chunks = [];
      let currentChunk = "";
      
      for (const sentence of sentences) {
        if ((currentChunk + sentence).length < 200) {
          currentChunk += sentence;
        } else {
          if (currentChunk) chunks.push(currentChunk.trim());
          currentChunk = sentence;
        }
      }
      if (currentChunk) chunks.push(currentChunk.trim());

      const audioBuffers = [];
      for (const chunk of chunks) {
        if (!chunk) continue;
        const translateUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(chunk)}`;
        const audioResp = await axios.get(translateUrl, { 
          responseType: 'arraybuffer',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        });
        audioBuffers.push(Buffer.from(audioResp.data));
      }
      
      if (audioBuffers.length === 0) {
        throw new Error('Failed to generate audio from Translate TTS service');
      }

      const combinedBuffer = Buffer.concat(audioBuffers);
      const audioContent = combinedBuffer.toString('base64');
      
      return NextResponse.json({ audioContent });
    }

  } catch (error) {
    console.error('Audio Generation Route Error:', error.response?.data || error.message);
    const errMessage = error.response?.data?.error?.message || error.message || 'Failed to generate audio';
    const errStatus = error.response?.status || 500;
    return NextResponse.json(
      { Error: errMessage },
      { status: errStatus }
    );
  }
}
