import React, { useEffect, useRef } from 'react';
import useResponsive from "@/hooks/useResponsive";
import { useVideo } from "@/context/VideoContext";
import VideoControls from "./VideoControls";
import RemoteVideo from "./RemoteVideo";
import { useAppContext } from "@/context/AppContext";

const VideoView = () => {
    const { viewHeight } = useResponsive();
    const { 
        localStream, 
        remoteStreams, 
        isInCall, 
        startCall,
        remoteUsernames 
    } = useVideo();
    
    const { currentUser } = useAppContext();
    const localVideoRef = useRef<HTMLVideoElement>(null);

    // Start call when component mounts if not already in a call
    useEffect(() => {
        if (!isInCall) {
            startCall();
        }
    }, [isInCall, startCall]);

    // Set local video stream
    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    return (
        <div
            className="flex max-h-full min-h-[400px] w-full flex-col gap-2 p-4"
            style={{ height: viewHeight }}
        >
            <h1 className="view-title">Video Call</h1>
            
            <div className="flex-grow flex flex-col gap-2">
                {/* Remote videos grid - adjust grid based on number of participants */}
                {remoteStreams.size > 0 ? (
                    <div className={`grid gap-2 flex-grow ${
                        remoteStreams.size === 1 ? 'grid-cols-1' : 
                        remoteStreams.size <= 4 ? 'grid-cols-2' : 
                        'grid-cols-3'
                    }`}>
                        {Array.from(remoteStreams).map(([userId, stream]) => (
                            <RemoteVideo 
                                key={userId} 
                                stream={stream} 
                                username={remoteUsernames?.get(userId) || "User"} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex-grow flex items-center justify-center bg-darkHover rounded-md">
                        <p className="text-white">Waiting for others to join...</p>
                    </div>
                )}
                
                {/* Local video - make it smaller when there are remote streams */}
                {localStream && (
                    <div className={`${remoteStreams.size > 0 ? 'h-1/4' : 'h-3/4'} min-h-[120px] bg-darkHover rounded-md overflow-hidden relative`}>
                        <video
                            ref={localVideoRef}
                            autoPlay
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-sm">
                            {currentUser?.username || "You"}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Video controls */}
            <VideoControls />
        </div>
    );
};

export default VideoView;
