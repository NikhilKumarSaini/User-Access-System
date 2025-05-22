import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateSoftware from './pages/CreateSoftware';
import RequestAccess from './pages/RequestAccess';
import PendingRequests from './pages/PendingRequests';
import ProtectedRoute from '././components/ProtectedRoute';
import HomeRedirect from '././components/HomeRedirect';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
          <Route path="/create-software" element={<CreateSoftware />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['Manager']} />}>
          <Route path="/pending-requests" element={<PendingRequests />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['Employee']} />}>
          <Route path="/request-access" element={<RequestAccess />} />
        </Route>

        <Route path="/" element={<HomeRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;