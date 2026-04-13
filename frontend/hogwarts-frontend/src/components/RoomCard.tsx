import "./styles/RoomCardStyle.css";
import type {Room} from "../types";
import { houseLabels, houseIcons } from "../types";

interface RoomCardProps {
    room: Room;
    onClick?: (room: Room) => void;
}

export const RoomCard = ({ room, onClick }: RoomCardProps) => {
    const houseName = houseLabels[room.House];
    const houseIcon = houseIcons[room.House];
    const occupancy = room.Students?.length ?? 0;

    return (
        <div
            className="room-card"
            onClick={() => onClick?.(room)}
        >
            <img
                src={houseIcon}
                alt={`${houseName} crest`}
                className="room-card-icon"
            />

            <h3 className="room-card-title">{room.Name}</h3>

            <p><strong>House:</strong> {houseName}</p>
            <p>
                <strong>Capacity:</strong> {occupancy} / {room.MaxCapacity}
            </p>
        </div>
    );
};
