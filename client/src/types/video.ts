interface VideoUser {
    id: string;
    username: string;
    stream: MediaStream | null;
}

interface VideoContext {
    localStream: MediaStream | null;
    remoteStreams: Map<string, MediaStream>;
    remoteUsernames: Map<string, string>;
    isVideoEnabled: boolean;
    isAudioEnabled: boolean;
    isInCall: boolean;
    toggleVideo: () => void;
    toggleAudio: () => void;
    startCall: () => Promise<void>;
    endCall: () => void;
}

export { VideoContext, VideoUser };