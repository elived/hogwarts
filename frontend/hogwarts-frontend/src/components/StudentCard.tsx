import "./styles/RoomCardStyle.css";
import "./styles/CardStyle.css";


import type {Student} from "../types";

import { houseLabels, houseIcons } from "../types";

interface StudentCardProps {
    student: Student;
    onClick?: (student: Student) => void;
}

export const StudentCard = ({ student }: StudentCardProps) => {
    const houseName = houseLabels[student.House];
    const houseIcon = houseIcons[student.House];
    const studentName = student.Name;

    return (
        <button className="card">
            <div className="room">
                <img
                    src={houseIcon}
                    alt={`${houseName} crest`}
                    className="image-position"
                />
                <div className="room-info">
                    <h3 className="card-title">{studentName}</h3>
                </div>
            </div>
        </button>
    );
};
