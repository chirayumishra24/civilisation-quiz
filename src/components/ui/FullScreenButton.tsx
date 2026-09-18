import React, { useState, useEffect } from 'react';
import { Maximize, Minimize } from 'lucide-react';

export const FullScreenButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Fullscreen toggle failed', err);
    }
  };

  return (
    <button
      onClick={toggleFullscreen}
      title={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
      aria-label="Toggle Full Screen"
      className={`p-2 rounded-2xl bg-white/90 hover:bg-white text-stone-700 hover:text-amber-800 transition-all active:scale-90 shadow-clay-sm border border-stone-200 backdrop-blur-md flex items-center justify-center z-50 ${className}`}
    >
      {isFullscreen ? (
        <Minimize className="w-4 h-4 text-amber-700" />
      ) : (
        <Maximize className="w-4 h-4 text-stone-700" />
      )}
    </button>
  );
};
