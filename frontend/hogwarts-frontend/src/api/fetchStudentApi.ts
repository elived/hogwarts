import {HouseType, PetType, type Room, type Student} from "../types";
import {CreateAuthRequest} from "./authApi.ts";
import {API_BASE_URL} from "../config/api.ts";

export async function fetchStudents(): Promise<Student[]> {
    const response = await fetch(`${API_BASE_URL}/api/Student`);

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

export async function fetchStudentById(id: number): Promise<Student> {
    const response = await fetch(`${API_BASE_URL}/api/Student/${id}`);

    if (!response.ok) {
        throw new Error(
            `Fetch Student by id failed: ${response.status} ${response.statusText}`
        );
    }

    const r = await response.json();

    return {
        Id: r.id,
        Name: r.name,
        House: r.house as HouseType,
        Pet: r.pet as PetType,
        RoomId: r.roomId,
        Room: r.room as Room
    };
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
    authReq.headers = {
        ...(authReq.headers || {}),
        "Content-Type": "application/json",
    };
    authReq.body = JSON.stringify(payload);



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

export async function deleteStudent(id: number): Promise<void> {
    const authReq = CreateAuthRequest({ method: "DELETE" });
    if (!authReq) throw new Error("Missing JWT token!");

    const response = await fetch(`${API_BASE_URL}/api/Student/${id}`, authReq);
    if (!response.ok) throw new Error(await response.text());

}