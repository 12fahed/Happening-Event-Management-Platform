import { useState, useEffect } from 'react';

export const useConversation = (options: any) => {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'disconnected'>('idle');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (options.onConnect) {
      options.onConnect();
    }
    setStatus('connected');

    // Simulate speaking every few seconds for demo purposes
    const speakingInterval = setInterval(() => {
      setIsSpeaking(prev => !prev);
    }, 3000);

    return () => {
      clearInterval(speakingInterval);
      if (options.onDisconnect) {
        options.onDisconnect();
      }
      setStatus('disconnected');
    };
  }, []);

  const startSession = async (config: any) => {
    console.log('Starting session with config:', config);
    return 'mock-conversation-id';
  };

  const endSession = async () => {
    console.log('Ending session');
  };

  const setVolume = async (volumeOptions: any) => {
    console.log('Setting volume:', volumeOptions);
  };

  return {
    status,
    isSpeaking,
    startSession,
    endSession,
    setVolume,
  };
};

