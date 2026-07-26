import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

// Code splitting with React.lazy for better performance
const Overview = lazy(() => import("../pages/Overview/Overview"));
const Courses = lazy(() => import("../pages/Courses/Courses"));
const Students = lazy(() => import("../pages/Students/Students"));
const Profits = lazy(() => import("../pages/Profits/Profits"));
const Certificates = lazy(() => import("../pages/Certificates/Certificates"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const Settings = lazy(() => import("../pages/Settings/Settings"));
const CourseDetail = lazy(() => import("../pages/CourseDetail/CourseDetail"));
const AssignmentsList = lazy(() => import("../pages/AssignmentsList/AssignmentsList"));
const AssignmentDetail = lazy(() => import("../pages/AssignmentDetail/AssignmentDetail"));
const AddAssignment = lazy(() => import("../pages/AddAssignment/AddAssignment"));
const GradingPage = lazy(() => import("../pages/GradingPage/GradingPage"));
const PeerReviewPage = lazy(() => import("../pages/PeerReviewPage/PeerReviewPage"));

// Simple loading component for lazy-loaded routes
function LoadingFallback() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '200px',
      fontSize: '16px',
      color: '#666'
    }}>
      جاري التحميل...
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Overview />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/students" element={<Students />} />
          <Route path="/profits" element={<Profits />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/assignments" element={<AssignmentsList />} />
          <Route path="/assignments/new" element={<AddAssignment />} />
          <Route path="/assignments/:id/edit" element={<AddAssignment />} />
          <Route path="/assignments/:id" element={<AssignmentDetail />} />
          <Route path="/assignments/:id/grade/:subId" element={<GradingPage />} />
          <Route path="/assignments/:id/peer-review/:reviewId" element={<PeerReviewPage />} />

          <Route path="*" element={<Overview />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
