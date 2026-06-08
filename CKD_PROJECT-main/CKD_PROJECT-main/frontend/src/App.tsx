import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import DataMethods from './pages/DataMethods';
import Results from './pages/Results';
import Implementation from './pages/Implementation';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Demo from './pages/Demo';
import SuccessStories from './pages/SuccessStories';
import Resources from './pages/Resources';
import Ethics from './pages/Ethics';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Register from './pages/Register';
import { authService } from './services/auth.service';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/data" element={<DataMethods />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/ethics" element={<Ethics />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/results" element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          } />
          <Route path="/implementation" element={
            <ProtectedRoute>
              <Implementation />
            </ProtectedRoute>
          } />
          <Route path="/demo" element={
            <ProtectedRoute>
              <Demo />
            </ProtectedRoute>
          } />
          <Route path="/success-stories" element={
            <ProtectedRoute>
              <SuccessStories />
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;