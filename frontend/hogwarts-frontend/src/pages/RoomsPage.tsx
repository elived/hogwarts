import { RoomCard } from "../components/RoomCard";
import type {Room} from "../types";
import {useEffect, useState} from "react";
import { fetchRooms} from "../api/fetchRoomApi.ts";
import "../components/styles/CardStyle.css";
import SearchBar from "../components/SearchBar.tsx";

function RoomsPage() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);



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
            <SearchBar<Room>
                onSearch={searchRoom}
                renderItem={(room) => (room.Id)}/>
            
            <div className="card-grid">
                {filteredRooms.map(room => (
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

/*
* 
* */