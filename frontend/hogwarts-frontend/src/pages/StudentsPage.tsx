import {useEffect, useState} from "react";
import type { Student} from "../types.ts";
import {fetchStudents} from "../api/fetchStudentApi.ts";
import {StudentCard} from "../components/StudentCard.tsx";

function StudentPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchStudents()
            .then(setStudents)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading students…</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main className="main">
            <h2>All Students of Hogwarts</h2>

            <div className="card-grid">
                {students.map(student => (
                    <StudentCard
                        key={student.Id}
                        student={student}
                        onClick={(r) => console.log("Clicked room:", r.Id)}
                    />
                ))}
            </div>
        </main>
    );
};

export default StudentPage