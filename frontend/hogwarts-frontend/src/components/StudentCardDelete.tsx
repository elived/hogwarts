import "./styles/RoomCardStyle.css";
import "./styles/CardStyle.css";


import type {Student} from "../types";

import { houseLabels, houseIcons } from "../types";

interface StudentCardProps {
    student: Student;
    onClick?: (student: Student) => void;
    onDelete?: (student: Student) => void;
}

export const StudentCardDelete = ({ student, onDelete }: StudentCardProps) => {
    const houseName = houseLabels[student.House];
    const houseIcon = houseIcons[student.House];
    const studentName = student.Name;

    return (
        <div className="card">
            <div className="room">
                <img
                    src={houseIcon}
                    alt={`${houseName} crest`}
                    className="image-position"
                />
                <div className="room-info">
                    <h3 className="card-title">{studentName}</h3>
                </div>
                {onDelete && (
                        <button
                            className="button-style"
                            onClick={(e) => {
                            e.stopPropagation();
                            onDelete(student);
                            }}
                        >
                            Delete student
                        </button>
                    )}
            </div>
        </div>
    );
};
