import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

import { AuthProvider } from './contexts/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AppLayout from './pages/AppLayout/AppLayout';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route
                        path='/app'
                        element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }>
                        <Route path='teams' element={<div>Teams</div>} />
                        <Route
                            path='teams/:teamId'
                            element={<div>Team XD</div>}
                        />
                        <Route
                            path='teams/:teamId/tasks'
                            element={<div>Tasks</div>}
                        />
                        <Route
                            path='user-tasks'
                            element={<div>User Tasks</div>}
                        />
                    </Route>
                    <Route path='*' element={<Navigate to='/app' />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
