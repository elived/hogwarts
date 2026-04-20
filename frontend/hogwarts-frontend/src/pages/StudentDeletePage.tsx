import {useEffect, useState} from "react";
import type { Student} from "../types.ts";
import {fetchStudents} from "../api/fetchStudentApi.ts";
import SearchBar from "../components/SearchBar.tsx";
import {StudentCardDelete} from "../components/StudentCardDelete.tsx";
import {deleteRoom} from "../api/fetchRoomApi.ts";

function StudentDeletePage() {
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
                    <StudentCardDelete
                        key={student.Id}
                        student={student}
                        onDelete={async () => {
                            try {
                                if (!window.confirm(`Are you sure you want to delete student "${student.Name}"? This action cannot be undone.`)) {
                                    return;
                                }

                                await deleteRoom(student.Id);

                                setStudents(prev =>
                                    prev.filter(s => s.Id !== student.Id)
                                );

                                setFilteredStudents(prev =>
                                    prev.filter(s => s.Id !== student.Id)
                                );
                            } catch (err) {
                                alert(err instanceof Error ? err.message : "Delete failed");
                            }
                        }}                    
                    />
                ))}
            </div>
        </main>
    );
};

export default StudentDeletePage