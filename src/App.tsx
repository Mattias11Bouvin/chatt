import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Chat from './Chat/Chat'; // Import the Chat component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Chat" element={<Chat />} /> 
        {/* You might have other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
