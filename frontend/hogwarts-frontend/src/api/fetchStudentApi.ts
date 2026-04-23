import {HouseType, PetType, type Student} from "../types";
import type { Room } from "../types";
import {CreateAuthRequest} from "./authApi.ts";
import {API_BASE_URL} from "../config/api.ts";

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
    const authReq = CreateAuthRequest({ method: "DELETE" });
    if (!authReq) throw new Error("Missing JWT token!");

    const response = await fetch(`${API_BASE_URL}/api/Student/${id}`, authReq);
    if (!response.ok) throw new Error(await response.text());
    
}