import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {houseIcons, houseLabels, HouseType, petLabels, PetType, type Student} from "../types";
import "../styles/HomePageStyle.css";
import {fetchStudentById} from "../api/fetchStudentApi.ts";


function StudentDetailsPage() {
    const { id } = useParams(); // ← gets ":id" from URL
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (!id) {
            setError("Missing student ID");
            setLoading(false);
            return;
        }

        const studentId = Number(id);
        if (Number.isNaN(studentId)) {
            setError("Invalid student ID");
            setLoading(false);
            return;
        }

        fetchStudentById(studentId)
            .then(setStudent)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);



    if (loading) return <p>Loading student…</p>;
    if (error) return <p>Error: {error}</p>;
    if (!student) return <p>Student not found</p>;


    return (
        <div>
            <h1>{student.Name}</h1>

            <img src={houseIcons[student.House as HouseType]} alt={houseLabels[student.House as HouseType]} className="custom-list-img"/>

            <p>House: {houseLabels[student.House as HouseType]}</p>
            <p>Pet: {petLabels[student.Pet as PetType]}</p>
            <img src={houseIcons[student.House as HouseType]} alt={houseLabels[student.House as HouseType]} className="custom-list-img"/>
        </div>
    );
}

export default StudentDetailsPage;