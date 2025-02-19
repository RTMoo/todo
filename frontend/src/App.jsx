import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginForm from './pages/LoginForm'
import RegisterForm from './pages/RegisterForm';
import Home from './pages/Home'
import TaskInfo from './components/TaskInfo';
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path='/' element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }>
                </Route>
                <Route path='/task/:id/' element={
                    <ProtectedRoute>
                        <TaskInfo />
                    </ProtectedRoute>
                }>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
