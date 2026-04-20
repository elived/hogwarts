import {useEffect, useState} from "react";
import type {UserRoleInfo} from "../types.ts";
import SearchBar from "../components/SearchBar.tsx";
import {deleteUser, fetchAllUsers} from "../api/authApi.ts";
import {UserCard} from "../components/UserCard.tsx";

function UserPage() {
    const [users, setUsers] = useState<UserRoleInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filteredUsers, setFilteredUsers] = useState<UserRoleInfo[]>([]);

    useEffect(() => {
        fetchAllUsers()
            .then(data => {
                setUsers(data);
                setFilteredUsers(data);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const searchUser = async (query: string): Promise<UserRoleInfo[]> => {
        const result = users.filter(users => users.username.includes(query.toLowerCase()));
        setFilteredUsers(result);
        return result;
    }

    if (loading) return <p>Loading users…</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main className="main">
            <h2>All Users</h2>
            <SearchBar<UserRoleInfo>
                onSearch={searchUser}
                renderItem={(user) =>(user.username)}
            />
            <div className="card-grid">
                {filteredUsers.map(user => (
                    <UserCard
                        key={user.username}
                        user={user}
                        onDelete={async () => {
                            try {
                                if (!window.confirm(`Are you sure you want to delete user "${user.username}"? This action cannot be undone.`)) {
                                    return;
                                }
                                await deleteUser(user.username);
                                
                                setUsers(prev =>
                                    prev.filter(u => u.username !== user.username)
                                );
                                
                                setFilteredUsers(prev =>
                                    prev.filter(u => u.username !== user.username)
                                );
                            } catch (err) {
                                alert(err instanceof Error ? err.message : "Delete failed");
                            }
                        }}
                    />
                ))}
            </div>
        </main>
    );
};

export default UserPage