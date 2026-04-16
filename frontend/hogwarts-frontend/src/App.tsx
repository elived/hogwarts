
import './App.css'
import React from 'react';
import HousesPage from "./pages/HousesPage.tsx";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import {Footer} from "./components/Footer.tsx";
import {Header} from "./components/Header.tsx";
import GryffindorPage from "./pages/GryffindorPage.tsx";
import HufflepuffPage from "./pages/HufflepuffPage.tsx";
import RavenclawPage from "./pages/RavenclawPage.tsx";
import SlytherinPage from "./pages/SlytherinPage.tsx";
import StudentsPage from "./pages/StudentsPage.tsx";
import RoomsPage from "./pages/RoomsPage.tsx";
import RoomDetailsPage from "./pages/RoomDetailsPage.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";
import {RegisterPage} from "./pages/RegisterPage.tsx";
import {logoutUser} from "./api/authApi.ts";
import {NotFoundPage} from "./pages/NotFoundPage.tsx";
import {ProtectedRoute} from "./utils/ProtectedRoute.tsx";
import {ProtectedLayout} from "./utils/ProtectedLayout.tsx";
import AdminPage from "./pages/AdminPage.tsx";

const App: React.FC = () => {
    const navLinks = [
        { text: 'Home', url: '/' },
        { text: 'Houses', url: '/houses'},
        { text: 'Students', url: '/students'},
        { text: 'Rooms', url: '/rooms'},
        { text: 'Login',  url: '/login' },
        { text: 'Logout', url: '/login', onClickAction: () => logoutUser() },
        {text: 'Admin', url: '/admin' }
    ];
    
  //const [house, setHouse] = useState<string | null>(null)
  
  return(

      <div className="app">
          <Header />

          <Routes>
              {/* ✅ PROTECTED ROUTES */}
              <Route element={<ProtectedRoute />}>
                  <Route element={<ProtectedLayout links={navLinks} />}>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/houses" element={<HousesPage />} />
                      <Route path="/students" element={<StudentsPage />} />
                      <Route path="/rooms" element={<RoomsPage />} />
                      <Route path="/rooms/:id" element={<RoomDetailsPage />} />
                      <Route path='/admin' element={<AdminPage />} />

                      <Route path="/houses/gryffindor" element={<GryffindorPage />} />
                      <Route path="/houses/hufflepuff" element={<HufflepuffPage />} />
                      <Route path="/houses/ravenclaw" element={<RavenclawPage />} />
                      <Route path="/houses/slytherin" element={<SlytherinPage />} />
                  </Route>
              </Route>

              {/* ✅ PUBLIC ROUTES */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <Footer />
      </div>

  )
}

export default App
