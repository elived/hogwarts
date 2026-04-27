import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createRoom} from "../api/fetchRoomApi.ts";
import {HouseType} from "../types.ts";

export default function CreateRoomPage() {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [house, setHouse] = useState<HouseType | null>(null);    
    const [maxCapacity, setMaxCapacity] = useState(4);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        if (!name.trim()) 
        {
            setError("Room name is requried");
            return;
        }

        if (house === null) {
            setError("Please select a house");
            return;
        }


        if (maxCapacity <= 0) {
            setError("Max capacity must be greater than 0");
            return;
        }
        
        try {
            setLoading(true);

            const createdRoom = await createRoom({
                Name: name.trim(),
                House: house as unknown as HouseType,
                MaxCapacity: maxCapacity,
                Students: []
            });
            
            navigate(`/rooms/${createdRoom.Id}`);
        } catch (err: any) {
            setError(err.message ?? "Failed to create room");
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <main className="main">
            <h1>Create new room</h1>
            
            <form onSubmit={submit} className="form">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Room name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    
                    <select
                        value={house ?? ""}
                        onChange={(e) => setHouse(Number(e.target.value))}
                    >
                        <option value="" disabled>Select house</option>
                        <option value={HouseType.Gryffindor}>Gryffindor</option>
                        <option value={HouseType.Hufflepuff}>Hufflepuff</option>
                        <option value={HouseType.Ravenclaw}>Ravenclaw</option>
                        <option value={HouseType.Slytherin}>Slytherin</option>
                    </select>
                    
                    <input
                        type="number"
                        min={1}
                        placeholder="Max capacity"
                        value={maxCapacity}
                        onChange={(e) => setMaxCapacity(Number(e.target.value))}
                    />
                </div>

                {error && <p>{error}</p>}
                <button type="submit" >
                    {loading ? "Creating..." : "Create Room"}
                </button>
            </form>
        </main>

    )
}