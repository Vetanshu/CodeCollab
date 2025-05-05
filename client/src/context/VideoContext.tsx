import { VideoContext as VideoContextType } from "@/types/video";
import { SocketEvent } from "@/types/socket";
import { ReactNode, createContext, useContext, useEffect, useState, useRef } from "react";
import { useSocket } from "./SocketContext";
import { useAppContext } from "./AppContext";

const VideoContext = createContext<VideoContextType | null>(null);

export const useVideo = (): VideoContextType => {
  const context = useContext(VideoContext);
  if (!context) {
      throw new Error("useVideo must be used within a VideoContextProvider");
  }
  return context;
};

function VideoContextProvider({ children }: { children: ReactNode }) {
  const { socket } = useSocket();
  const { currentUser } = useAppContext();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(new Map());
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isInCall, setIsInCall] = useState(false);
  const [remoteUsernames, setRemoteUsernames] = useState<Map<string, string>>(new Map()); // Add this line
    
  // Store peer connections
  const peerConnections = useRef<Map<string, RTCPeerConnection>>(new Map());

  // Toggle video
  const toggleVideo = () => {
      if (localStream) {
          const videoTracks = localStream.getVideoTracks();
          videoTracks.forEach(track => {
              track.enabled = !track.enabled;
          });
          setIsVideoEnabled(!isVideoEnabled);
      }
  };

  // Toggle audio
  const toggleAudio = () => {
      if (localStream) {
          const audioTracks = localStream.getAudioTracks();
          audioTracks.forEach(track => {
              track.enabled = !track.enabled;
          });
          setIsAudioEnabled(!isAudioEnabled);
      }
  };

  // Start video call
  const startCall = async () => {
      try {
          const stream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: true
          });
            
          setLocalStream(stream);
          setIsInCall(true);
            
          // Notify server that user joined video call
          socket.emit(SocketEvent.VIDEO_CALL_JOIN, {
              username: currentUser.username
          });
            
      } catch (error) {
          console.error("Error accessing media devices:", error);
      }
  };

  // End video call
  const endCall = () => {
      // Stop all tracks in local stream
      if (localStream) {
          localStream.getTracks().forEach(track => track.stop());
          setLocalStream(null);
      }
        
      // Close all peer connections
      peerConnections.current.forEach((connection) => {
          connection.close();
      });
      peerConnections.current.clear();
        
      // Clear remote streams
      setRemoteStreams(new Map());
      // Clear remote usernames
      setRemoteUsernames(new Map()); // Add this line
      setIsInCall(false);
        
      // Notify server that user left video call
      socket.emit(SocketEvent.VIDEO_CALL_LEAVE, {
          username: currentUser.username
      });
  };

  // Create peer connection for a user
  const createPeerConnection = (userId: string) => {
      try {
          const peerConnection = new RTCPeerConnection({
              iceServers: [
                  { urls: "stun:stun.stunprotocol.org:3478" },
                  { urls: "stun:stun.l.google.com:19302" }
              ]
          });
            
          // Add local stream tracks to peer connection
          if (localStream) {
              localStream.getTracks().forEach(track => {
                  peerConnection.addTrack(track, localStream);
              });
          }
            
          // Handle ICE candidates
          peerConnection.onicecandidate = (event) => {
              if (event.candidate) {
                  socket.emit(SocketEvent.NEW_ICE_CANDIDATE, {
                      candidate: event.candidate,
                      targetUserId: userId
                  });
              }
          };
            
          // Handle incoming tracks
          peerConnection.ontrack = (event) => {
              const [stream] = event.streams;
              setRemoteStreams(prev => {
                  const newStreams = new Map(prev);
                  newStreams.set(userId, stream);
                  return newStreams;
              });
          };
            
          peerConnections.current.set(userId, peerConnection);
          return peerConnection;
            
      } catch (error) {
          console.error("Error creating peer connection:", error);
          return null;
      }
  };

  // Handle incoming video call events
  useEffect(() => {
      // Handle new user joining video call
      socket.on(SocketEvent.VIDEO_CALL_JOIN, async ({ userId, username }) => {
          console.log(`${username} joined the video call`);
          
          // Store username for the user
          setRemoteUsernames(prev => {
              const newUsernames = new Map(prev);
              newUsernames.set(userId, username);
              return newUsernames;
          });
            
          if (userId !== currentUser._id && isInCall) {
              // Create peer connection for new user
              const peerConnection = createPeerConnection(userId);
                
              if (peerConnection) {
                  try {
                      // Create and send offer
                      const offer = await peerConnection.createOffer();
                      await peerConnection.setLocalDescription(offer);
                        
                      socket.emit(SocketEvent.VIDEO_OFFER, {
                          offer,
                          targetUserId: userId
                      });
                  } catch (error) {
                      console.error("Error creating offer:", error);
                  }
              }
          }
      });        
      // Handle user leaving video call
      socket.on(SocketEvent.VIDEO_CALL_LEAVE, ({ userId, username }) => {
          console.log(`${username} left the video call`);
            
          // Close peer connection
          const peerConnection = peerConnections.current.get(userId);
          if (peerConnection) {
              peerConnection.close();
              peerConnections.current.delete(userId);
          }
            
          // Remove remote stream
          setRemoteStreams(prev => {
              const newStreams = new Map(prev);
              newStreams.delete(userId);
              return newStreams;
          });
          
          // Remove username
          setRemoteUsernames(prev => {
              const newUsernames = new Map(prev);
              newUsernames.delete(userId);
              return newUsernames;
          });
      });
        
      // Handle incoming video offer
      socket.on(SocketEvent.VIDEO_OFFER, async ({ offer, userId }) => {
          if (isInCall) {
              // Create peer connection if it doesn't exist
              let peerConnection = peerConnections.current.get(userId);
              if (!peerConnection) {
                  const newPeerConnection = createPeerConnection(userId);
                  if (newPeerConnection) {
                      peerConnection = newPeerConnection;
                  }
              }
                
              if (peerConnection) {
                  try {
                      // Set remote description
                      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
                        
                      // Create and send answer
                      const answer = await peerConnection.createAnswer();
                      await peerConnection.setLocalDescription(answer);
                        
                      socket.emit(SocketEvent.VIDEO_ANSWER, {
                          answer,
                          targetUserId: userId
                      });
                  } catch (error) {
                      console.error("Error handling offer:", error);
                  }
              }
          }
      });        
      // Handle incoming video answer
      socket.on(SocketEvent.VIDEO_ANSWER, async ({ answer, userId }) => {
          const peerConnection = peerConnections.current.get(userId);
          if (peerConnection) {
              try {
                  await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
              } catch (error) {
                  console.error("Error handling answer:", error);
              }
          }
      });
        
      // Handle incoming ICE candidates
      socket.on(SocketEvent.NEW_ICE_CANDIDATE, async ({ candidate, userId }) => {
          const peerConnection = peerConnections.current.get(userId);
          if (peerConnection) {
              try {
                  await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
              } catch (error) {
                  console.error("Error adding ICE candidate:", error);
              }
          }
      });
        
      return () => {
          socket.off(SocketEvent.VIDEO_CALL_JOIN);
          socket.off(SocketEvent.VIDEO_CALL_LEAVE);
          socket.off(SocketEvent.VIDEO_OFFER);
          socket.off(SocketEvent.VIDEO_ANSWER);
          socket.off(SocketEvent.NEW_ICE_CANDIDATE);
      };
  }, [socket, currentUser, isInCall]);

  return (
      <VideoContext.Provider
          value={{
              localStream,
              remoteStreams,
              remoteUsernames, // Add this line
              isVideoEnabled,
              isAudioEnabled,
              isInCall,
              toggleVideo,
              toggleAudio,
              startCall,
              endCall
          }}
      >
          {children}
      </VideoContext.Provider>
  );
}

export { VideoContextProvider };
export default VideoContext;
