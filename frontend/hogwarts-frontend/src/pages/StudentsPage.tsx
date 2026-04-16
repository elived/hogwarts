import {useEffect, useState} from "react";
import type { Student} from "../types.ts";
import {fetchStudents} from "../api/fetchStudentApi.ts";
import {StudentCard} from "../components/StudentCard.tsx";
import SearchBar from "../components/SearchBar.tsx";

function StudentPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

    useEffect(() => {
        fetchStudents()
            .then(data => {
                setStudents(data);
                setFilteredStudents(data);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);
    
    const searchStudent = async (query: string): Promise<Student[]> => {
        const result = students.filter(student => student.Name.toLowerCase().includes(query.toLowerCase()));
        setFilteredStudents(result);
        return result;
    }

    if (loading) return <p>Loading students…</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main className="main">
            <h2>All Students of Hogwarts</h2>
            <SearchBar<Student>
                onSearch={searchStudent}
                renderItem={(student) =>(student.Id)}
            />
            <div className="card-grid">
                {filteredStudents.map(student => (
                    <StudentCard
                        key={student.Id}
                        student={student}
                        onClick={(s) => console.log("Clicked student:", s.Id)}
                    />
                ))}
            </div>
        </main>
    );
};

export default StudentPage