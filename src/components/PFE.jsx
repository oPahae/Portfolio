import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize } from 'lucide-react';

const PFE = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSkip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = pos * duration;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume || 0.5;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black/20 text-white flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="max-w-6xl w-full relative z-10">
        {/* Header */}
        {/* <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-500 via-cyan-500 to-cyan-500 bg-clip-text text-transparent">
            Projet de Fin d'Études
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full mx-auto"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Présentation vidéo de mon projet de fin d'études
          </p>
        </div> */}

        {/* Video Container */}
        <div className="relative overflow-hidden rounded-3xl backdrop-blur-3xl p-[2px]">
          <div 
            className="backdrop-blur-sm rounded-3xl overflow-hidden relative"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            {/* Video Element */}
            <video
              ref={videoRef}
              src="/pfe.mp4"
              className="w-full aspect-video object-cover"
              onClick={togglePlay}
            />

            {/* Play/Pause Overlay */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                onClick={togglePlay}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-2xl opacity-50"></div>
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-[3px]">
                    <div className="w-full h-full rounded-full bg-black/90 flex items-center justify-center">
                      <Play className="w-10 h-10 text-white ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Custom Controls */}
            <div 
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Progress Bar */}
              <div 
                className="mb-4 h-2 bg-gray-700 rounded-full cursor-pointer relative group"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full relative"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between">
                {/* Left Controls */}
                <div className="flex items-center gap-4">
                  {/* Skip Back */}
                  <button
                    onClick={() => handleSkip(-10)}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                  >
                    <SkipBack className="w-5 h-5 text-white" />
                  </button>

                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:shadow-lg transition-all duration-300 flex items-center justify-center transform hover:scale-105"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-1" />
                    )}
                  </button>

                  {/* Skip Forward */}
                  <button
                    onClick={() => handleSkip(10)}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                  >
                    <SkipForward className="w-5 h-5 text-white" />
                  </button>

                  {/* Time Display */}
                  <div className="text-white text-sm font-medium">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-4">
                  {/* Volume Control */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 text-white" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, rgb(236, 72, 153) 0%, rgb(168, 85, 247) ${(isMuted ? 0 : volume) * 50}%, rgb(34, 211, 238) ${(isMuted ? 0 : volume) * 100}%, rgb(75, 85, 99) ${(isMuted ? 0 : volume) * 100}%)`
                      }}
                    />
                  </div>

                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                  >
                    <Maximize className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        .slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default PFE;