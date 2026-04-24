import { useEffect, useState } from "react";
import { checkStudentStatus } from "../api/fetchStudentApi";
import {houseIcons, houseLabels, HouseType, petLabels, PetType} from "../types.ts";

export default function ProfilePage() {
    const [student, setStudent] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        checkStudentStatus()
            .then(setStudent)
            .catch(err => setError(err.message));
    }, []);

    if (error) return <p>{error}</p>;
    if (!student) return <p>Loading...</p>;

    return (
        <div>
            <h1>Welcome, {student.name}</h1>

            <img src={houseIcons[student.house as HouseType]} alt={houseLabels[student.house as HouseType]} className="custom-list-img"/>
            
            <p>House: {houseLabels[student.house as HouseType]}</p>
            <p>Pet: {petLabels[student.pet as PetType]}</p>
            <p>Room: {student.room?.name}</p>
            <img src={houseIcons[student.house as HouseType]} alt={houseLabels[student.house as HouseType]} className="custom-list-img"/>


        </div>
    );
}