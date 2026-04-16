import {useEffect, useState} from "react";
import type {UserRoleInfo} from "../types.ts";
import {decodeRole} from "../utils/jwtDecoder.ts";
import {checkAuthorized} from "../api/authApi.ts";
import RoomsPage from "./RoomsPage.tsx";
import StudentsPage from "./StudentsPage.tsx";
import "../styles/HomePageStyle.css";


function AdminPage() {
    const [userRoleInfos, setUserRoleInfos] = useState<UserRoleInfo[]>([]);
    const role = decodeRole();

    const updateStoredInfo = () => {
        checkAuthorized().then(res => {
            const users = res as unknown as UserRoleInfo[];
            setUserRoleInfos(users.sort((a, b) => a.id - b.id));
        });
    }

    useEffect(() => {
        updateStoredInfo();
    }, [])

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
                <RoomsPage></RoomsPage>
                <StudentsPage></StudentsPage>
            </div>

            <div className="card-grid">
                {userRoleInfos.map(userInfo => (
                    <div key={userInfo.id} className="card" style={{ padding: 'var(--spacing-md)', minHeight: 'auto', width: '100%', maxWidth: '300px' }}>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminPage;