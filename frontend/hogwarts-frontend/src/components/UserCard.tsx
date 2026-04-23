import "./styles/RoomCardStyle.css";
import "./styles/CardStyle.css";


import type { UserRoleInfo} from "../types";


interface UserCardProps {
    user: UserRoleInfo;
    onClick?: (user: UserRoleInfo) => void;
    onDelete?: (user: UserRoleInfo) => void;
    onRoleChange(username: string, role: string) : void;
}

export const UserCard = ({ user, onDelete, onRoleChange }: UserCardProps) => {
    const username = user.username;
    const role = user.role;

    return (
        <div className="card">
            <div className="room">
                <div className="room-info">
                    <h3 className="card-title">{username}</h3>
                    <h3>{role}</h3>
                </div>
                {onDelete && (
                    <button
                        className="delete-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(user);
                        }}
                        >
                        Delete user
                    </button>
                )}
                <select
                    className="delete-button"
                    value={user.role}
                    onChange={(event) => onRoleChange(user.username, event.target.value)}
                >
                     <option value="admin">Admin</option>
                     <option value="user">User</option>   
                </select>
            </div>
        </div>
    );
};
