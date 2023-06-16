import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Chat from './Chat/Chat'; // Import the Chat component
import LandingPage from './LandingPage/LandingPage'; 
import TaskBoard from './Manage/TaskBoard';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Chat" element={<Chat />} /> 
        <Route path="/Taskboard" element={<TaskBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
