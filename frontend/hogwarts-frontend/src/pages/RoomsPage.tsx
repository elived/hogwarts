import { RoomCard } from "../components/RoomCard";
import type {Room} from "../types";
import {useEffect, useState} from "react";
import {fetchRooms} from "../api/fetchRoomApi.ts";



function RoomsPage() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRooms()
            .then(setRooms)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading rooms…</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main className="main">
            <h2>All Rooms</h2>

            <div className="room-grid">
                {rooms.map(room => (
                    <RoomCard
                        key={room.Id}
                        room={room}
                        onClick={(r) => console.log("Clicked room:", r.Id)}
                    />
                ))}
            </div>
        </main>
    );
};

export default RoomsPage