/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";
import { Home } from "./pages/Home";
import { Tools } from "./pages/Tools";
import { Community } from "./pages/Community";
import { Blog } from "./pages/Blog";
import { Pricing } from "./pages/Pricing";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { TemplateDetail } from "./pages/TemplateDetail";
import { Dashboard } from "./pages/Dashboard";
import { DashboardGenerations } from "./pages/DashboardGenerations";
import { DashboardBilling } from "./pages/DashboardBilling";
import { DashboardSettings } from "./pages/DashboardSettings";
import { DashboardReferrals } from "./pages/DashboardReferrals";
import { DashboardUsage } from "./pages/DashboardUsage";
import { ToolDetail } from "./pages/ToolDetail";
import { Category } from "./pages/Category";
import { Legal } from "./pages/Legal";
import { Comparison } from "./pages/Comparison";
import { FreeTool } from "./pages/FreeTool";
import { SuperAdmin } from "./pages/SuperAdmin";
import { SuperAdminTemplates } from "./pages/SuperAdminTemplates";
import { SuperAdminModels } from "./pages/SuperAdminModels";
import { SuperAdminUsers } from "./pages/SuperAdminUsers";
import { SuperAdminAnalytics } from "./pages/SuperAdminAnalytics";
import { BottomNav } from "./components/layout/BottomNav";
import { ADMIN_BASE } from "./lib/admin";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="pb-16 md:pb-0" // Add padding for bottom nav on mobile
      >
        <Routes location={location}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/:id" element={<ToolDetail />} />
          <Route path="/community" element={<Community />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/template/:id" element={<TemplateDetail />} />
          <Route path="/templates/:category" element={<Category />} />
          <Route path="/privacy-policy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="/refund-policy" element={<Legal />} />
          <Route path="/cookie-policy" element={<Legal />} />
          <Route path="/vs/:competitor" element={<Comparison />} />
          <Route path="/free-tools/:tool" element={<FreeTool />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/generations" element={<ProtectedRoute><DashboardGenerations /></ProtectedRoute>} />
          <Route path="/dashboard/billing" element={<ProtectedRoute><DashboardBilling /></ProtectedRoute>} />
          <Route path="/dashboard/profile" element={<ProtectedRoute><DashboardSettings /></ProtectedRoute>} />
          <Route path="/dashboard/referrals" element={<ProtectedRoute><DashboardReferrals /></ProtectedRoute>} />
          <Route path="/dashboard/usage" element={<ProtectedRoute><DashboardUsage /></ProtectedRoute>} />
          <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          {/* Super Admin Routes (Admin only - hidden behind secret path) */}
          <Route path={ADMIN_BASE} element={<AdminRoute><SuperAdmin /></AdminRoute>} />
          <Route path={`${ADMIN_BASE}/templates`} element={<AdminRoute><SuperAdminTemplates /></AdminRoute>} />
          <Route path={`${ADMIN_BASE}/models`} element={<AdminRoute><SuperAdminModels /></AdminRoute>} />
          <Route path={`${ADMIN_BASE}/users`} element={<AdminRoute><SuperAdminUsers /></AdminRoute>} />
          <Route path={`${ADMIN_BASE}/analytics`} element={<AdminRoute><SuperAdminAnalytics /></AdminRoute>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <AnimatedRoutes />
          <BottomNav />
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}
