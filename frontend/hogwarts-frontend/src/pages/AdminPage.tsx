import {useEffect, useState} from "react";
import type {UserRoleInfo} from "../types.ts";
import {decodeRole} from "../utils/jwtDecoder.ts";
import {checkAuthorized} from "../api/authApi.ts";

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
            <h2>Rooms</h2>
            <h2>Students</h2>
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