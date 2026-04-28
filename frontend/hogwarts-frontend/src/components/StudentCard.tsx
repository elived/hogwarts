import "./styles/RoomCardStyle.css";
import "./styles/CardStyle.css";


import type {Student} from "../types";

import { houseLabels, houseIcons } from "../types";
import {useNavigate} from "react-router-dom";

interface StudentCardProps {
    student: Student;
    onClick?: (student: Student) => void;
}

export const StudentCard = ({ student }: StudentCardProps) => {
    const houseName = houseLabels[student.House];
    const houseIcon = houseIcons[student.House];
    const studentName = student.Name;
    const navigate = useNavigate();

    return (
        <div className="card"
        onClick={() => navigate(`/students/${student.Id}`)}>
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
        </div>
    );
};
