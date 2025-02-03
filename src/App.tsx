import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";
import Header from "./components/Header";

export function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Router>
        <Routes>
          {/* Rota pública */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rota protegida */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<><Header/><div className="p-6"><Dashboard /></div></>} />
          </Route>

          {/* Rota padrão */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
