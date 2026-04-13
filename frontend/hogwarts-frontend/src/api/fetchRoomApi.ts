import { HouseType } from "../types";
import type { Room } from "../types";

export async function fetchRooms(): Promise<Room[]> {
    const response = await fetch("/api/Rooms");

    if (!response.ok) {
        throw new Error(
            `Fetch all Rooms failed: ${response.status} ${response.statusText}`
        );
    }

    const rawRooms = await response.json();

    return rawRooms.map((r: any) => ({
        Id: r.id,
        Name: r.name,
        House: r.house as HouseType,
        MaxCapacity: r.maxCapacity,
        Students: r.students ?? []
    }));
}