import "./styles/RoomCardStyle.css";
import "./styles/CardStyle.css";
import "./styles/HouseCardStyle.css";

import { useNavigate } from "react-router-dom";

import type {Room} from "../types";
import { houseLabels, houseIcons } from "../types";

interface RoomCardProps {
    room: Room;
    onClick?: (room: Room) => void;
}

export const RoomCard = ({ room }: RoomCardProps) => {
    const houseName = houseLabels[room.House];
    const houseIcon = houseIcons[room.House];
    const occupancy = room.Students?.length ?? 0;
    const navigate = useNavigate();

    return (
        <div className="card"
                onClick={() => navigate(`/rooms/${room.Id}`)}>
            <div className="room">
                <img
                    src={houseIcon}
                    alt={`${houseName} crest`}
                    className="image-position"
                />
                <div className="room-info">
                    <h3 className="card-title">{room.Name}</h3>

                    <p><strong>House:</strong> {houseName} <br/>
                        <strong><br/>Capacity:</strong> {occupancy} / {room.MaxCapacity}</p>
                </div>
            </div>
        </div>
    );
};
