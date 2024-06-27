import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/header/Header";
import CourseHome from "./components/allcourses/CourseHome";
import Pricing from "./components/pricing/Pricing";
import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";
import Team from "./components/team/Team";
import Facultypublications from "./components/team/facultypublications";
import Facheivements from "./components/team/Facheivements";
import Finnovation from "./components/team/Finnovation";
import Fparticipation from "./components/team/Fparticipation";
import Ftaids from "./components/team/Ftaids";
import Fprofile from "./components/team/Fprofile";
import Login from "./components/admin/Login";
import Admin from "./components/admin/Admin";
import Event from "./components/admin/pages/event";
import Results from "./components/admin/pages/results";
import ProtectedRoute from "./components/common/Protectedroute";
import Timetable from "./components/admin/pages/timetable";
import TeachingFaculty from "./components/admin/pages/TeachingFaculty";
import Techfaculty from "./components/admin/pages/Techfaculty";
import Syllabus from "./components/admin/pages/Syllabus";
import CalendarManager from "./components/admin/pages/CalendarManager";
import CarouselManager from "./components/admin/pages/Carousel";
import PublicationManager from "./components/admin/pages/PublicationManager";
import AchievementsManager from "./components/admin/pages/AchievementsManager";
import ParticipationManager from "./components/admin/pages/ParticipationManager";
import Toast from "./components/popup/Popup";
import Placements from "./components/admin/pages/Placements";
import UserManagement from "./components/admin/pages/UserManagement";
import UserDashboard from './components/admin/Editorspage';

function App() {
  

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/academics" element={<CourseHome />} />
          <Route exact path="/faculty" element={<Team />} />
          <Route exact path="/updates" element={<Pricing />} />
          <Route exact path="/faculty" element={<Team />}>
            <Route exact path="profiles" element={<Fprofile />} />
            <Route exact path="publications" element={<Facultypublications />} />
            <Route exact path="acheivements" element={<Facheivements />} />
            <Route exact path="innovations" element={<Finnovation />} />
            <Route exact path="participation" element={<Fparticipation />} />
            <Route exact path="teachingaids" element={<Ftaids />} />
          </Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/admin" element={<ProtectedRoute element={<Admin />} />}>
            <Route exact path="event" element={<ProtectedRoute element={<Event />} />} />
            <Route exact path="result" element={<ProtectedRoute element={<Results />} />} />
            <Route exact path="timetable" element={<ProtectedRoute element={<Timetable />} />} />
            <Route exact path="teachingfaculty" element={<ProtectedRoute element={<TeachingFaculty />} />} />
            <Route exact path="techfaculty" element={<ProtectedRoute element={<Techfaculty />} />} />
            <Route exact path="syllabus" element={<ProtectedRoute element={<Syllabus />} />} />
            <Route exact path="calendar" element={<ProtectedRoute element={<CalendarManager />} />} />
            <Route exact path="carouselimages" element={<ProtectedRoute element={<CarouselManager />} />} />
            <Route exact path="publications" element={<ProtectedRoute element={<PublicationManager />} />} />
            <Route exact path="achievements" element={<ProtectedRoute element={<AchievementsManager />} />} />
            <Route exact path="participations" element={<ProtectedRoute element={<ParticipationManager />} />} />
            <Route exact path="placements" element={<ProtectedRoute element={<Placements />} />} />
            <Route exact path="user-management" element={<ProtectedRoute element={<UserManagement />} />} /> {/* Add route for User Management */}
          </Route>
          <Route exact path="/edits" element={<ProtectedRoute element={<UserDashboard />} />}>
            <Route exact path="event" element={<ProtectedRoute element={<Event />} />} />
            <Route exact path="result" element={<ProtectedRoute element={<Results />} />} />
            <Route exact path="timetable" element={<ProtectedRoute element={<Timetable />} />} />
            <Route exact path="teachingfaculty" element={<ProtectedRoute element={<TeachingFaculty />} />} />
            <Route exact path="techfaculty" element={<ProtectedRoute element={<Techfaculty />} />} />
            <Route exact path="syllabus" element={<ProtectedRoute element={<Syllabus />} />} />
            <Route exact path="calendar" element={<ProtectedRoute element={<CalendarManager />} />} />
            <Route exact path="carouselimages" element={<ProtectedRoute element={<CarouselManager />} />} />
            <Route exact path="publications" element={<ProtectedRoute element={<PublicationManager />} />} />
            <Route exact path="achievements" element={<ProtectedRoute element={<AchievementsManager />} />} />
            <Route exact path="participations" element={<ProtectedRoute element={<ParticipationManager />} />} />
            <Route exact path="placements" element={<ProtectedRoute element={<Placements />} />} />
            <Route exact path="user-management" element={<ProtectedRoute element={<UserManagement />} />} /> {/* Add route for User Management */}
          </Route>
        </Routes>
        <Footer />
      </Router>
      <Toast/>
    </>
  );
}

export default App;
