import { useVideo } from '@/context/VideoContext';
import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash, FaPhoneSlash } from 'react-icons/fa';

const VideoControls = () => {
  const { isVideoEnabled, isAudioEnabled, toggleVideo, toggleAudio, endCall } = useVideo();

  // Handle errors gracefully
  const handleToggleVideo = () => {
    try {
      toggleVideo();
    } catch (error) {
      console.error("Error toggling video:", error);
    }
  };

  const handleToggleAudio = () => {
    try {
      toggleAudio();
    } catch (error) {
      console.error("Error toggling audio:", error);
    }
  };

  const handleEndCall = () => {
    try {
      endCall();
    } catch (error) {
      console.error("Error ending call:", error);
    }
  };

  return (
    <div className="flex justify-center gap-4 p-2 bg-dark rounded-md">
      <button
        onClick={handleToggleVideo}
        className="p-3 rounded-full bg-darkHover hover:bg-blue-600 transition-colors"
        title={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
      >
        {isVideoEnabled ? <FaVideo size={20} /> : <FaVideoSlash size={20} />}
      </button>
      
      <button
        onClick={handleToggleAudio}
        className="p-3 rounded-full bg-darkHover hover:bg-blue-600 transition-colors"
        title={isAudioEnabled ? "Mute microphone" : "Unmute microphone"}
      >
        {isAudioEnabled ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
      </button>
      
      <button
        onClick={handleEndCall}
        className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
        title="End call"
      >
        <FaPhoneSlash size={20} />
      </button>
    </div>
  );
};

export default VideoControls;
