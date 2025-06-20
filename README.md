
# CodeCollab 🚀

A collaborative, real-time code editor platform where developers can code together seamlessly. Built with modern web technologies to provide an intuitive and powerful collaborative coding experience.



## ✨ Features
## Home Page
<img width="1644" alt="Screenshot 2025-06-18 at 3 22 13 PM" src="https://github.com/user-attachments/assets/c448d1af-e237-4c03-b4cf-ae0b9ab4c285" />

## Sign up/ Login Page
<img width="1636" alt="Screenshot 2025-06-18 at 3 41 58 PM" src="https://github.com/user-attachments/assets/d1f66906-6ba3-45e9-a3cf-e9b491527578" />

## Code Space
<img width="1655" alt="Code Space" src="https://github.com/user-attachments/assets/4faac5ba-6c06-45ca-8055-a3f6f6d91ee6" />

## Chat Space
<img width="1469" alt="Chat Space" src="https://github.com/user-attachments/assets/ee656edd-a32f-402e-9353-66ceee69781f" />

## White Board
<img width="1664" alt="White Board" src="https://github.com/user-attachments/assets/6d9141a8-b9a0-44bc-acb6-36993e952dba" />

## Copilot Space
<img width="1638" alt="Copilot Space" src="https://github.com/user-attachments/assets/e40c28f8-bfa6-4138-b9f1-96d2f250e9af" />

## User Space
<img width="1663" alt="User Space" src="https://github.com/user-attachments/assets/32709e7b-fba3-4168-bf66-4e43343e8b73" />


### 🤝 Real-time Collaboration
- **Multi-user Code Editing**: Multiple developers can edit code simultaneously across different files
- **Instant Synchronization**: Changes are reflected immediately across all connected clients

### 🏠 Room-based Collaboration
- **Unique Room IDs**: Create and share rooms with unique identifiers
- **Easy Room Sharing**: Invite team members by simply sharing the room ID

### 📁 File Management
- **Multi-file Support**: Work with complete project structures
- **File Tree Navigation**: Intuitive folder and file organization
- **File Operations**: Create, rename, delete files and directories
- **Project Export**: Download entire codebase as ZIP files

### 💬 Communication Tools
- **Integrated Chat**: Real-time group messaging within coding sessions
- **Collaborative Drawing**: Visual brainstorming with shared drawing canvas
- **Team Coordination**: Stay connected while coding together

### 🔧 Development Features
- **Code Execution**: Run code directly in the browser
- **Syntax Highlighting**: Support for multiple programming languages
- **LeetCode-style Challenges**: Practice coding problems solo or collaboratively
- **User Authentication**: Secure login and session management

## 🛠️ Tech Stack

### Frontend
- **React** - Modern UI library for building interactive interfaces
- **TypeScript** - Type-safe JavaScript for better development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **React Router** - Client-side routing for single-page application
-  **Tailwind CSS** - Client-side routing for single-page application

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast and minimal web framework
- **Socket.io** - Real-time bidirectional event-based communication

### Development Tools
- **UUID** - Unique identifier generation
- **React Icons** - Beautiful icon library

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Vetanshu/CodeCollab.git
cd CodeCollab
```

2. **Install client dependencies**
```bash
cd client
npm install
```

3. **Install server dependencies**
```bash
cd ../server
npm install
```

4. **Start the development servers**

Start the backend server:
```bash
cd server
npm run dev
```

Start the frontend client:
```bash
cd client
npm run dev
```



## 📖 Usage

### Creating a Collaboration Session
1. **Sign up/Login** to your CodeCollab account
2. **Create a new room** or join an existing one with a room ID
3. **Share the room ID** with your team members
4. **Start coding together** in real-time!

### File Management
- **Create files/folders**: Right-click in the file explorer
- **Rename items**: Double-click on file/folder names
- **Delete items**: Use the context menu options
- **Export project**: Download your work as a ZIP file

### Collaboration Features
- **Real-time editing**: Changes appear instantly for all users
- **Group chat**: Communicate with your team while coding
- **Drawing board**: Sketch ideas and diagrams together
- **Code execution**: Test your code directly in the platform

## 🏗️ Project Structure

```
CodeCollab/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── files/      # File management components
│   │   │   └── navbar/     # Navigation components
│   │   ├── pages/          # Application pages
│   │   ├── services/       # API and authentication services
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
├── server/                 # Node.js backend application
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   └── socket/             # Socket.io event handlers
└── README.md
```

