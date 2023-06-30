import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Login from "./Login/Login";
import Chat from "./Chat/Chat"; // Import the Chat component
import LandingPage from "./LandingPage/LandingPage";
import TaskBoard from "./Manage/TaskBoard";
import FaqManager from "./FAQ/FAQ";
import DocumentManager from "./Document/Document";
import Calendar from "./Calender/Calender";

// Denna komponent kontrollerar om användaren är inloggad och skyddar rutterna
const AuthenticatedRoute = ({ element: Component, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tillståndet för inloggning

  // Kolla om användaren är inloggad, annars omdirigera till inloggningssidan
  if (!isLoggedIn) {
    return <Navigate to="/Login" />;
  }

  // Om användaren är inloggad renderas komponenten för den givna vägen
  return <Route {...rest} element={<Component />} />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/Chat"
          element={<AuthenticatedRoute element={<Chat />} />}
        />
        <Route
          path="/Taskboard"
          element={<AuthenticatedRoute element={<TaskBoard />} />}
        />
        <Route
          path="/Faq"
          element={<AuthenticatedRoute element={<FaqManager />} />}
        />
        <Route
          path="/Document"
          element={<AuthenticatedRoute element={<DocumentManager />} />}
        />
        <Route
          path="/Calendar"
          element={<AuthenticatedRoute element={<Calendar />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
