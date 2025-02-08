// src/router/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import QuestionList from "../pages/questions/QuestionList";
import QuestionDetail from "../pages/questions/QuestionDetail";
import Profile from "../pages/user/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import RegisterSuccess from "../pages/auth/RegisterSuccess";
import VerifyEmail from '../pages/auth/VerifyEmail';
import MainLayout from "../components/layout/MainLayout"; // 包含 Navbar、Sidebar、MainContainer
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ForgotPasswordSuccess from "../pages/auth/ForgotPasswordSuccess";

const AppRouter = () => {
  return (
    <Routes>
      {/* 公開路由 */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-success" element={<RegisterSuccess />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password-success" element={<ForgotPasswordSuccess />} />

      {/* 受保護的路由，統一包在 MainLayout 內 */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/questions" element={<QuestionList />} />
        <Route path="/questions/:id" element={<QuestionDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      
      {/* 沒有匹配到的路由，根據是否登入導向不同頁面 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
