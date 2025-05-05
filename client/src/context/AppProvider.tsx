import { ReactNode } from "react";
import { AppContextProvider } from "./AppContext";
import { ChatContextProvider } from "./ChatContext";
import { FileContextProvider } from "./FileContext";
import { RunCodeContextProvider } from "./RunCodeContext";
import { SettingContextProvider } from "./SettingContext";
import { SocketProvider } from "./SocketContext";
import { ViewContextProvider } from "./ViewContext";
import { CopilotContextProvider } from "./CopilotContext";
import { VideoContextProvider } from "./VideoContext";

function AppProvider({ children }: { children: ReactNode }) {
    return (
        <AppContextProvider>
            <SocketProvider>
                <SettingContextProvider>
                    <ViewContextProvider>
                        <FileContextProvider>
                            <ChatContextProvider>
                                <VideoContextProvider>
                                    <CopilotContextProvider>
                                        <RunCodeContextProvider>
                                            {children}
                                        </RunCodeContextProvider>
                                    </CopilotContextProvider>
                                </VideoContextProvider>
                            </ChatContextProvider>
                        </FileContextProvider>
                    </ViewContextProvider>
                </SettingContextProvider>
            </SocketProvider>
        </AppContextProvider>
    );
}

export default AppProvider;
