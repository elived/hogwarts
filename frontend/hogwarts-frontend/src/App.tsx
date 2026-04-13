//import { useState } from 'react'

import './App.css'
import React from 'react';
import Navbar from './components/Navbar.tsx';
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

const App: React.FC = () => {
    const navLinks = [
        { text: 'Home', url: '/' },
        { text: 'Houses', url: '/houses'},
        { text: 'Students', url: '/students'},
        { text: 'Rooms', url: '/rooms'},
        { text: 'Login',  url: '/login' }  
    ];
    
  //const [house, setHouse] = useState<string | null>(null)
  
  return(
      <div className="app">
      <Header />
          
        <div className="main-layout">
            <Navbar links={navLinks} /> 
            
            <main className="page-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/houses" element={<HousesPage />} />
                    <Route path="/students" element={<StudentsPage />} />
                    <Route path="/rooms" element={<RoomsPage />} />
                    <Route path="/houses/gryffindor" element={<GryffindorPage />} />
                    <Route path="/houses/hufflepuff" element={<HufflepuffPage />} />
                    <Route path="/houses/ravenclaw" element={<RavenclawPage />} />
                    <Route path="/houses/slytherin" element={<SlytherinPage />} />
                </Routes>
            </main>
        </div>  
        <Footer />
      </div>
  )
}

export default App
