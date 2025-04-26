# TravelWheelsPH Web Application

## Getting Started

Follow these instructions to get the application running locally:

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account

### Installation & Setup

1. Clone the repository or extract the files
2. Open two terminal windows/tabs - one for frontend, one for server

### Backend Setup (Server)
1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory with:
```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=3001
```

4. Start the server:
```bash
npm start
```

The server should now be running on http://localhost:3001

### Frontend Setup
1. In a new terminal, navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend should automatically open in your browser at http://localhost:3000

### Running Both Together
1. First terminal (server):
```bash
cd server
npm start
```

2. Second terminal (frontend):
```bash
cd frontend
npm start
```

The application should now be fully functional with both frontend and backend running.
