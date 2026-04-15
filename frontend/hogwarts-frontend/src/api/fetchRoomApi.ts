import {HouseType, PetType} from "../types";
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

export async function fetchRoomById(id: number): Promise<Room> {
    const response = await fetch(`/api/Rooms/${id}`);

    if (!response.ok) {
        throw new Error(
            `Fetch Room by id failed: ${response.status} ${response.statusText}`
        );
    }

    const r = await response.json();

    return {
        Id: r.id,
        Name: r.name,
        House: r.house as HouseType,
        MaxCapacity: r.maxCapacity,
        Students:
            (r.students ?? []).map((s: any) => ({
                Id: s.id,
                Name: s.name,
                House: s.house as HouseType,
                Pet: s.pet as PetType,
                RoomId: s.roomId
            }))

    };
}