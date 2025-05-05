import { useEffect, useRef } from 'react';

interface RemoteVideoProps {
  stream: MediaStream;
  username: string; // Changed from userId to username
}

const RemoteVideo = ({ stream, username }: RemoteVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Add error handling for video playback
        const handlePlayError = (e: Event) => {
            console.error("Error playing remote video:", e);
        };
        
        videoRef.current.addEventListener('error', handlePlayError);
        
        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('error', handlePlayError);
            }
        };
    }
  }, [stream]);

  return (
    <div className="relative bg-darkHover rounded-md overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-sm">
        {username}
      </div>
    </div>
  );
};

export default RemoteVideo;
