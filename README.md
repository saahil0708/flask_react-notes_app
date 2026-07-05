# Workspace Notes Editor

A modern, highly-responsive workspace and note management application. Designed with a sleek dark-tech aesthetic and a warm orange accent theme, it provides a premium editorial experience for managing your daily notes and projects.

## Features

- **Dynamic Workspace Management**: Create, update, and delete dedicated workspaces. Workspaces act as high-level folders to keep your notes organized. Select from a wide variety of icons to customize each workspace.
- **Rich Note Editor**: A distraction-free, fully editable note interface. 
- **Tagging System**: Add comma-separated tags to any note. Tags are automatically formatted with hashtags for a clean, editorial look.
- **Bulk Operations**: Robust multi-select mode allows you to select multiple notes at once and delete them in bulk.
- **Premium UI/UX**: Built with Tailwind CSS, featuring subtle glassmorphism, animated floating action buttons (FAB), and smooth state transitions. 
- **Safe Actions**: Destructive actions (like deleting workspaces or bulk notes) are protected by sleek confirmation modals.

## Tech Stack

### Frontend (`apps/Client`)
- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS (Custom Dark Theme with Orange-500 accents)
- **Icons**: Lucide React
- **Typography**: Custom fonts (`GT Flexa Lt` and `JetBrains Mono`)

### Backend (Coming Soon)
- **API**: Flask (Python)
- **RAG Service**: Planned integration for advanced search and AI capabilities.

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation & Setup

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repo-url>
   cd flask-notes
   ```

2. **Install Frontend Dependencies**:
   Navigate to the Client application folder and install the required packages.
   ```bash
   cd apps/Client
   npm install
   ```

3. **Run the Development Server**:
   Start the Vite development server.
   ```bash
   npm run dev
   ```
   The application will typically be available at `http://localhost:5173`.

## Application Structure

- `Navigation.jsx`: The left sidebar managing workspaces. Includes hover actions for updating and deleting.
- `NoteList.jsx`: The middle column displaying notes for the active workspace. Includes the multi-select bulk deletion workflow.
- `NoteEditor.jsx`: The main reading and editing pane for individual notes, featuring the tagging system and a floating save button.
- `NewPageModal.jsx` / `ConfirmModal.jsx`: Reusable modal components for creating/editing entities and confirming destructive actions safely.

## Future Enhancements
- Connect frontend CRUD operations to the Flask API for persistent storage.
- Implement robust backend authentication.
- Connect the search bar to dynamically filter notes by title, content, or tags.
- Integrate the planned Python `rag_service` for advanced contextual queries.
