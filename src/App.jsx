import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './contexts/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AppLayout from './pages/AppLayout/AppLayout';
import HomePage from './pages/HomePage/HomePage';
import { ProfileProvider } from './contexts/ProfileProvider';
import { TeamsProvider } from './contexts/TeamsProvider';
import TeamTasks from './components/TeamTasks/TeamTasks';

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
                                <ProfileProvider>
                                    <TeamsProvider>
                                        <AppLayout />
                                    </TeamsProvider>
                                </ProfileProvider>
                            </ProtectedRoute>
                        }>
                        <Route index element={<HomePage />} />
                        <Route
                            path='team/:teamId/tasks'
                            element={<TeamTasks />}
                        />
                        <Route
                            path='team/:teamId/members'
                            element={<div>Members</div>}
                        />
                        <Route
                            path='userTasks'
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
