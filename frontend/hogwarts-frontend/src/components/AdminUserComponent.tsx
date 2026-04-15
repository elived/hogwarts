import type { UserRoleInfo } from "../types";

interface AdminUserComponentPros {
    user: UserRoleInfo;
}

export function AdminUserComponent({ user }: AdminUserComponentPros) {
    return (
        <div className="admin-user-container">
            <div className="admin-user-username">{user.username}</div>
            <div className="admin-user-id">ID: {user.id}</div>

            <label className="admin-role-label">
                Role:
                <select
                    className="admin-role-select"
                    value={user.role}
                >
                    <option value="Admin">Admin</option>
                    <option value="StoreOwner">Store Owner</option>
                    <option value="User">User</option>
                </select>
            </label>
        </div>
    )
}