import type {Room} from "../types";
import {useEffect, useState} from "react";
import {deleteRoom, fetchRooms} from "../api/fetchRoomApi.ts";
import "../components/styles/CardStyle.css";
import SearchBar from "../components/SearchBar.tsx";
import {RoomCardDelete} from "../components/RoomCardDelete.tsx";
import {useNavigate} from "react-router-dom";
import "../components/styles/ButtonStyle.css"

function RoomsPageDelete() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
    const navigate = useNavigate();



    useEffect(() => {
        fetchRooms()
            .then(data => {
                setRooms(data);
                setFilteredRooms(data);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const searchRoom = async (query: string): Promise<Room[]> => {
        const result = rooms.filter(room =>
            room.Name.toLowerCase().includes(query.toLowerCase()));
        setFilteredRooms(result);
        return result;
    };

    if (loading) return <p>Loading rooms…</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main className="main">
            <h2>All the Rooms of Hogwarts</h2>
            <button
                className="button-style" onClick={() => {navigate('/admin/create-room')}}>
                Create a new room
            </button>
            <p> <br/> </p>
            <SearchBar<Room>
                onSearch={searchRoom}
                renderItem={(room) => (room.Id)}/>
            <div className="card-grid">
                {filteredRooms.map(room => (
                    <RoomCardDelete
                        key={room.Id}
                        room={room}
                        onDelete={async () => {
                            try {
                                if (room.Students.length > 0) {
                                    alert(`Cannot delete room "${room.Name}" because it has students assigned.`);
                                    return;
                                }
                                if (!window.confirm(`Are you sure you want to delete the room "${room.Name}"? This action cannot be undone.`)) {
                                    return;
                                }
                                
                                await deleteRoom(room.Id);

                                setRooms(prev =>
                                    prev.filter(r => r.Id !== room.Id)
                                );

                                setFilteredRooms(prev =>
                                    prev.filter(r => r.Id !== room.Id)
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
}

export default RoomsPageDelete
