import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {houseLabels, type Room} from "../types";
import {fetchRoomById} from "../api/fetchRoomApi.ts";

function RoomDetailsPage() {
    const { id } = useParams(); // ← gets ":id" from URL
    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (!id) {
            setError("Missing room ID");
            setLoading(false);
            return;
        }

        const roomId = Number(id);
        if (Number.isNaN(roomId)) {
            setError("Invalid room ID");
            setLoading(false);
            return;
        }

        fetchRoomById(roomId)
            .then(setRoom)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);



    if (loading) return <p>Loading room…</p>;
    if (error) return <p>Error: {error}</p>;
    if (!room) return <p>Room not found</p>;

    const houseName = houseLabels[room.House];

    return (
        <main className="main">
            <h2>{room.Name}</h2>
            <p>House: {houseName}</p>

            <h3>Students</h3>
            <ul>
                {room.Students.length === 0 ? (
                    <li key="no-students">No students assigned</li>
                ) : (
                    room.Students.map(student => (
                        <li key={student.Id}>{student.Name}</li>
                    ))
                )}

            </ul>
        </main>
    );
}

export default RoomDetailsPage;