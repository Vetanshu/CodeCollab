export enum VIEWS {
    FILES = "files",
    CHATS = "chats",
    COPILOT = "copilot",
    RUN = "run",
    CLIENTS = "clients",
    SETTINGS = "settings",
    VIDEO = "video"
}

interface ViewContext {
    activeView: VIEWS
    setActiveView: (activeView: VIEWS) => void
    isSidebarOpen: boolean
    setIsSidebarOpen: (isSidebarOpen: boolean) => void
    viewComponents: { [key in VIEWS]: JSX.Element }
    viewIcons: { [key in VIEWS]: JSX.Element }
}

export { ViewContext }
