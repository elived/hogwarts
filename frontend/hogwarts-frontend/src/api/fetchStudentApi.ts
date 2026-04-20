import {HouseType, PetType, type Student} from "../types";
import type { Room } from "../types";

export async function fetchStudents(): Promise<Student[]> {
    const response = await fetch("/api/Student");

    if (!response.ok) {
        throw new Error(
            `Fetch all Students failed: ${response.status} ${response.statusText}`
        );
    }

    const rawStudents = await response.json();

    return rawStudents.map((s: any) => ({
        Id: s.id,
        Name: s.name,
        House: s.house as HouseType,
        Pet: s.pet as PetType,
        RoomId: s.roomId,
        Room: s.room as Room
    }));
}

export async function deleteStudent(id: number): Promise<void> {
    const response = await fetch(`/api/Student/${id}`, {method: "DELETE"});
    
    if (!response.ok){
        throw new Error(
            `Delete Student with id ${id} failed: ${response.status} ${response.statusText}`
        )
    }
    
}