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

export async function becomeStudent(
    payload: {
        name: string;
        pet: number;
        answers: { house: number }[];
    }
): Promise<any> {


    const authReq = CreateAuthRequest();
    if (!authReq) throw new Error("Missing JWT token!");

    authReq.method = "POST";
    authReq.body = new Blob(
        [JSON.stringify(payload)],
        { type: "application/json" }
    );


    const response = await fetch(
        `${API_BASE_URL}/api/Student/become-student`,
        authReq
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }
    
   return response.json();
}

export async function checkStudentStatus(): Promise<Student> {
    const authReq = CreateAuthRequest({ method: "GET" });
    if (!authReq) throw new Error("Missing JWT token!");

    const response = await fetch(`${API_BASE_URL}/api/Student/check-studentStatus`, authReq);
    if (!response.ok) throw new Error(await response.text());
    
    return await response.json() as Student;
}