import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy loaded Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Courses = lazy(() => import('./pages/Courses'));
const Faculty = lazy(() => import('./pages/Faculty'));
const Facilities = lazy(() => import('./pages/Facilities'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Admissions = lazy(() => import('./pages/Admissions'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lazy loaded Admin Pages
const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const ProtectedAdminRoute = lazy(() => import('./admin/ProtectedAdminRoute'));
const Dashboard = lazy(() => import('./admin/Dashboard'));
const FacultyCRUD = lazy(() => import('./admin/FacultyCRUD'));
const CourseCRUD = lazy(() => import('./admin/CourseCRUD'));
const GalleryCRUD = lazy(() => import('./admin/GalleryCRUD'));
const InquiryManagement = lazy(() => import('./admin/InquiryManagement'));
const AdmissionCRUD = lazy(() => import('./admin/AdmissionCRUD'));
const SiteSettings = lazy(() => import('./admin/SiteSettings'));
const AdminManagement = lazy(() => import('./admin/AdminManagement'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-medical-blue)]"></div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              <Route element={<ProtectedAdminRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/faculty" element={<FacultyCRUD />} />
                  <Route path="/admin/courses" element={<CourseCRUD />} />
                  <Route path="/admin/gallery" element={<GalleryCRUD />} />
                  <Route path="/admin/inquiries" element={<InquiryManagement />} />
                  <Route path="/admin/admissions-content" element={<AdmissionCRUD />} />
                  <Route path="/admin/settings" element={<SiteSettings />} />
                  <Route path="/admin/manage-admins" element={<AdminManagement />} />
                </Route>
              </Route>

              {/* Public Routes Layout */}
              <Route element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Outlet />
                  </main>
                  <Footer />
                </>
              }>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/faculty" element={<Faculty />} />
                <Route path="/facilities" element={<Facilities />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
