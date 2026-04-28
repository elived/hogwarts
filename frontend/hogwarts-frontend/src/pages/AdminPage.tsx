import {decodeRole} from "../utils/jwtDecoder.ts";
import "../styles/HomePageStyle.css";
import UserPage from "./UserPage.tsx";
import RoomsPageDelete from "./RoomPageDelete.tsx";
import StudentDeletePage from "./StudentDeletePage.tsx";
import "../components/styles/ButtonStyle.css"


function AdminPage() {
    
    
    const role = decodeRole();
    console.log(import.meta.env.VITE_API_BASE_URL);
    

    if (role !== "Admin") {
        return (
            <div className="container flex-center" style={{ flexDirection: 'column', height: '50vh' }}>
                <h1 style={{ color: 'var(--error-color)' }}>INTRUDER!</h1>
                <p>You do not have permission to view this page.</p>
            </div>
        )
    }

    return (
        <div className="container">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-grid">
                <div>
                    <UserPage/>
                </div>
                <div>
                    <RoomsPageDelete/>
                </div>
                <div>
                    <StudentDeletePage/>
                </div>
            </div>
        </div>
    )
}

export default AdminPage;