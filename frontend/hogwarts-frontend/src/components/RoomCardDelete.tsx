import "./styles/RoomCardStyle.css";
import "./styles/CardStyle.css";
import type {Room} from "../types";
import { houseLabels, houseIcons } from "../types";

interface RoomCardProps {
    room: Room;
    onClick?: (room: Room) => void;
    onDelete?: (room: Room) => void;
}

export const RoomCardDelete = ({ room, onDelete }: RoomCardProps) => {
    const houseName = houseLabels[room.House];
    const houseIcon = houseIcons[room.House];
    const occupancy = room.Students?.length ?? 0;

    return (
        <div className="card">
            <div className="room">
                <img
                    src={houseIcon}
                    alt={`${houseName} crest`}
                    className="image-position"
                />
                <div className="room-info">
                    <h3 className="card-title">{room.Name}</h3>
                       <p><strong>Occupancy:</strong> {occupancy} / {room.MaxCapacity} of students</p>
                </div>
                {onDelete && (
                    <button
                        className="button-style"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(room);
                        }}
                    >
                        Delete room
                    </button>
                )}
            </div>
        </div>
    );
};
